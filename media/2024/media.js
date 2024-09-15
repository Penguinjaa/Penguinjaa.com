function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "flex";
    document.getElementById(tabName).style.flexWrap = "wrap";
    document.getElementById(tabName).style.justifyContent = "space-evenly";
    evt.currentTarget.className += " active";
    
    document.querySelector('.boxbody').scrollTo(0, 0);
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('media.json')
        .then(response => response.json())
        .then(data => {
            populateTab('Movies', data.movies, 'moviecontainer');
            populateTab('Albums', data.albums, 'albumcontainer');
            populateTab('Other', data.other, 'moviecontainer');
            document.querySelector('.tab-link').click();
        })
        .catch(error => console.error('Error loading JSON:', error));
});
function populateTab(tabId, items, containerClass) {
    const tab = document.getElementById(tabId);
    items.forEach(item => {
        let container = document.createElement('div');
        container.className = containerClass;
        let img = document.createElement('img');
        img.loading = "lazy";
        img.src = item.cover;
        img.alt = item.title;
        let title = document.createElement('p');
        title.className = 'mediatitle';
        title.textContent = item.title;
        let date = document.createElement('p');
        date.className = 'date';
        date.textContent = item.date;
        let ratingDiv = document.createElement('p');
        ratingDiv.className = 'rating';
        if (item.link && item.link !== "") {
            let ratingAnchor = document.createElement('a');
            ratingAnchor.href = item.link;
            ratingAnchor.target = "_blank";
            ratingAnchor.textContent = `${item.rating}/100`;
            ratingDiv.appendChild(ratingAnchor);
        } else {
            ratingDiv.textContent = `${item.rating}/100`;
        }
        let ratingPopup = document.createElement('div');
        ratingPopup.className = 'rating-popup';
        if (tabId === 'Albums' && item.favorite_songs) {
            ratingPopup.textContent = `Favorite Songs: ${item.favorite_songs}`;
        }
        ratingDiv.appendChild(ratingPopup);
        let dateRatingContainer = document.createElement('div');
        dateRatingContainer.className = 'date-rating-container';
        dateRatingContainer.appendChild(date);
        dateRatingContainer.appendChild(ratingDiv);
        container.appendChild(img);
        container.appendChild(title);
        container.appendChild(dateRatingContainer);
        tab.appendChild(container);
    });
}