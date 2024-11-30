const userToken = 'LZUKrcvsphzIlVFaPceVRDZQKkvIEfgvAzRvZKwf';
const username = 'Penguinjaa';
const itemsPerPage = 10;
let currentPage = 1;

function fetchDiscogsData(endpoint, page = 1) {
    const url = `https://api.discogs.com/users/${username}/${endpoint}?page=${page}&per_page=${itemsPerPage}&token=${userToken}`;

    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error('Error fetching data:', error));
}

function removeParentheses(str) {
    return str.replace(/\s*\(.*?\)\s*/g, '');
}

function displayCollection(data) {
    const collectionDiv = document.getElementById('collection');
    collectionDiv.innerHTML = '';
    data.releases.forEach(release => {
        const releaseDiv = document.createElement('div');
        releaseDiv.classList.add('albumcontainer');
        releaseDiv.innerHTML = `
            <img src="${release.basic_information.cover_image}" alt="${release.basic_information.title}" width="150">
            <p class="albumtitle"><strong><a href="https://www.discogs.com/release/${release.basic_information.id}" target="_blank">${release.basic_information.title}</a></strong></p><p class="artistname"> ${release.basic_information.artists[0].name}</p>
        `;
        collectionDiv.appendChild(releaseDiv);
    });

    const elements = document.querySelectorAll('.artistname');
    elements.forEach(element => {
        element.textContent = removeParentheses(element.textContent);
    });
}

function displayWantlist(data) {
    const wantlistDiv = document.getElementById('wantlist');
    wantlistDiv.innerHTML = '';
    data.wants.forEach(want => {
        const wantDiv = document.createElement('div');
        wantDiv.classList.add('albumcontainer');
        wantDiv.innerHTML = `
            <img src="${want.basic_information.cover_image}" alt="${want.basic_information.title}" width="150">
            <p class="albumtitle"><strong><a href="https://www.discogs.com/release/${want.basic_information.id}" target="_blank">${want.basic_information.title}</a></strong></p><p class="artistname"> ${want.basic_information.artists[0].name}</p>
        `;
        wantlistDiv.appendChild(wantDiv);
    });

    const elements = document.querySelectorAll('.artistname');
    elements.forEach(element => {
        element.textContent = removeParentheses(element.textContent);
    });
}

function updatePagination(totalPages) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    // Previous page button
    const prevPageButton = document.createElement('button');
    prevPageButton.textContent = "◄";
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateWantlist();
        }
    });
    prevPageButton.classList.add('pagination-button', 'prev');
    paginationDiv.appendChild(prevPageButton);

    // Numbered pages
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            updateWantlist();
        });

        pageButton.classList.add('pagination-button');
        if (i === currentPage) {
            pageButton.classList.add('active');
        } else {
            pageButton.classList.add('inactive');
        }

        paginationDiv.appendChild(pageButton);
    }

    const nextPageButton = document.createElement('button');
    nextPageButton.textContent = "▶";
    nextPageButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateWantlist();
        }
    });
    nextPageButton.classList.add('pagination-button', 'next');
    paginationDiv.appendChild(nextPageButton);
}

function updateWantlist() {
    fetchDiscogsData('wants', currentPage)
        .then(data => {
            displayWantlist(data);
            updatePagination(Math.ceil(data.pagination.items / itemsPerPage));
        });
}


function init() {
    fetchDiscogsData('collection/folders/0/releases')
        .then(data => displayCollection(data));

    updateWantlist();

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateWantlist();
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        currentPage++;
        updateWantlist();
    });
}

document.addEventListener('DOMContentLoaded', init);