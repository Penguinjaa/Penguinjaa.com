function showTab(tab) {
    document.querySelectorAll('.tab-section').forEach(section => {
        section.style.display = 'none';
    });

    const activeTab = document.getElementById(tab);
    if (activeTab) {
        activeTab.style.display = 'flex';
    }

    document.getElementById('entries').scrollTop = 0;
    history.pushState(null, '', `#${tab}`);

    document.querySelectorAll('.media-tab').forEach(btn => {
        if (btn.dataset.tab === tab) {
            btn.style.filter = '';
        } else {
            btn.style.filter = 'invert(100%) hue-rotate(180deg)';
        }
    });
}

let detailedView = false;

function setViewMode(detailed) {
    detailedView = detailed;
    localStorage.setItem('mediaViewMode', detailed ? 'detailed' : 'simple');

    const allContainers = document.querySelectorAll('.movie-container, .album-container, .other-container');
    const allEntries = document.querySelectorAll('.entry');
    const allReviews = document.querySelectorAll('.review-text');
    const allButtons = document.querySelectorAll('.review-button');

    if (detailedView) {
        allContainers.forEach(el => el.classList.add('focused-entry'));
        allEntries.forEach(el => el.classList.add('focused-entry'));
        allReviews.forEach(p => {
            p.classList.add('open');
            p.style.maxHeight = 'none';
            p.style.opacity = '1';
        });
        allButtons.forEach(b => b.style.display = 'none');
    } else {
        allContainers.forEach(el => el.classList.remove('focused-entry'));
        allEntries.forEach(el => el.classList.remove('focused-entry'));
        allReviews.forEach(p => {
            p.classList.remove('open');
            p.style.maxHeight = '0';
            p.style.opacity = '0';
        });
        allButtons.forEach(b => {
            b.style.display = 'inline-block';
            b.textContent = '[REVIEW]';
        });
    }
}

function attachReviewHandlers() {
    document.querySelectorAll('.review-button').forEach(button => {
        button.addEventListener('click', () => {
            if (detailedView) return;

            const currentContainer = button.closest('.movie-container, .album-container, .other-container');
            const parentEntry = button.closest('.entry');
            const review = currentContainer.querySelector('.review-text');
            const alreadyFocused = currentContainer.classList.contains('focused-entry');

            document.querySelectorAll('.focused-entry').forEach(el => el.classList.remove('focused-entry'));
            document.querySelectorAll('.entry.focused-entry').forEach(el => el.classList.remove('focused-entry'));
            document.querySelectorAll('.review-text').forEach(p => {
                p.style.maxHeight = '0';
                p.style.opacity = '0';
            });
            document.querySelectorAll('.review-button').forEach(b => b.textContent = '[REVIEW]');

            if (!alreadyFocused) {
                currentContainer.classList.add('focused-entry');
                parentEntry.classList.add('focused-entry');

                review.style.maxHeight = 'none';
                review.style.opacity = '1';

                button.textContent = '[CLOSE]';

                parentEntry.scrollIntoView({ behavior: 'auto', block: 'start' });
            } else {
                parentEntry.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
        });
    });
}

fetch('media.json')
    .then(response => response.json())
    .then(data => {
        const createEntry = (item, type, i) => {
            const container = document.getElementById(type);
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');
            entryDiv.id = `${type}${i + 1}`;

            const hasReview = item.review && item.review.trim() !== '';
            const reviewButton = hasReview ? `<button class="review-button">[REVIEW]</button>` : '';
            let reviewHTML = `<p class="review-text">`;
            if (hasReview) {
                reviewHTML += item.review;
                if (type === 'music' && item.favorite_songs && item.favorite_songs.trim() !== '') {
                    reviewHTML += `<br><br><i>FAVORITE TRACKS: ${item.favorite_songs}</i>`;
                }
            } else {
                reviewHTML += `<span class="no-review">No review written.</span>`;
            }
            reviewHTML += `</p>`;


            let extraHTML = '';
            if (type === 'music') {
                extraHTML = `<h5>${item.artist}</h5>`;
            }

            entryDiv.innerHTML = `
                <div class="${type === 'movies' ? 'movie-container' : type === 'music' ? 'album-container' : 'other-container'}"> 
                    <div class="cover"><img src="${item.cover}" alt="${item.title}" loading="lazy"></div>
                    <div class="entry-info">
                        <h2>${item.title}${item.year ? ` (${item.year})` : ''}</h2>
                        ${extraHTML}
                        <h3 class="ratedate"><span class="date">${item.date}</span><span class="rating">${item.rating}/100</span></h3>
                        ${reviewHTML}
                        ${reviewButton}
                    </div>
                </div>
            `;
            container.appendChild(entryDiv);
        };

        data.movies.forEach((movie, i) => createEntry(movie, 'movies', i));
        data.albums.forEach((album, i) => createEntry(album, 'music', i));
        data.other.forEach((item, i) => createEntry(item, 'other', i));

        attachReviewHandlers();

        const hash = window.location.hash.substring(1);
        const validTabs = ['movies', 'music', 'other'];
        if (validTabs.includes(hash)) {
            showTab(hash);
        } else {
            showTab('movies');
        }

        const savedView = localStorage.getItem('mediaViewMode');
        setViewMode(savedView === 'detailed');

        const btnList = document.getElementById('btn-list-view');
        const btnGrid = document.getElementById('btn-grid-view');

        function updateButtonStyles(selected) {
            if (selected === 'grid') {
                btnList.style.filter = 'invert(100%) hue-rotate(180deg)';
                btnGrid.style.filter = '';
            } else {
                btnGrid.style.filter = 'invert(100%) hue-rotate(180deg)';
                btnList.style.filter = '';
            }
        }

        btnList.addEventListener('click', () => {
            setViewMode(true);
            document.getElementById('entries').scrollTop = 0;
            updateButtonStyles('list');
        });

        btnGrid.addEventListener('click', () => {
            setViewMode(false);
            document.getElementById('entries').scrollTop = 0;
            updateButtonStyles('grid');
        });

        updateButtonStyles(savedView === 'detailed' ? 'list' : 'grid');
    })
    .catch(err => console.error('Error loading media data:', err));