const userToken = 'LZUKrcvsphzIlVFaPceVRDZQKkvIEfgvAzRvZKwf';
const username = 'Penguinjaa';
const itemsPerPage = 24;
let currentPage = 1;
let currentTab = 'collection';
let allCollection = [];
let allWants = [];

function fetchDiscogsPage(endpoint, page = 1, perPage = 100) {
    const url = `https://api.discogs.com/users/${username}/${endpoint}?page=${page}&per_page=${perPage}&token=${userToken}`;
    return fetch(url)
        .then(res => res.json())
        .catch(() => null);
}

function removeParentheses(str) {
    return str.replace(/\s*\(.*?\)\s*/g, '');
}

function displayItems(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = items.slice(start, end);

    pageItems.forEach(item => {
        const release = item.basic_information || item;
        const discogsUrl = `https://www.discogs.com/release/${release.id}`;
        const div = document.createElement('div');
        div.classList.add('albumcontainer');
        div.innerHTML = `
            <img loading="lazy" src="${release.cover_image}" alt="${release.title}">
            <p class="albumtitle"><strong><a href="${discogsUrl}" target="_blank">${release.title}</a></strong></p>
            <p class="artistname">${removeParentheses(release.artists[0].name)}</p>
        `;
        container.appendChild(div);
    });
}

function updatePagination(totalPages) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '◄';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPage();
            updatePagination(totalPages);
        }
    });
    paginationDiv.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = i === currentPage ? 'active' : 'inactive';
        btn.addEventListener('click', () => {
            if (i !== currentPage) {
                currentPage = i;
                displayPage();
                updatePagination(totalPages);
            }
        });
        paginationDiv.appendChild(btn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '▶';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayPage();
            updatePagination(totalPages);
        }
    });
    paginationDiv.appendChild(nextBtn);
}

async function fetchAllPages(endpoint, key) {
    let page = 1;
    let allItems = [];
    let data = await fetchDiscogsPage(endpoint, page, 100);
    if (!data) return allItems;
    allItems = data[key];

    while (page < data.pagination.pages) {
        page++;
        data = await fetchDiscogsPage(endpoint, page, 100);
        if (!data) break;
        allItems = allItems.concat(data[key]);
    }
    return allItems;
}

async function loadInitialCollection() {
    const data = await fetchDiscogsPage('collection/folders/0/releases', 1, 100);
    if (data) {
        allCollection = data.releases;
        displayPage();
        updatePagination(Math.ceil(allCollection.length / itemsPerPage));
    }
}

async function loadAllCollection() {
    allCollection = await fetchAllPages('collection/folders/0/releases', 'releases');
}

async function loadAllWants() {
    allWants = await fetchAllPages('wants', 'wants');
}

function displayPage() {
    if (currentTab === 'collection') {
        displayItems(allCollection, 'collection');
        const totalPages = Math.ceil(allCollection.length / itemsPerPage);
        document.getElementById('pagination').style.display = totalPages > 1 ? 'block' : 'none';
        updatePagination(totalPages);
    } else {
        displayItems(allWants, 'wantlist');
        const totalPages = Math.ceil(allWants.length / itemsPerPage);
        document.getElementById('pagination').style.display = totalPages > 1 ? 'block' : 'none';
        updatePagination(totalPages);
    }
}

function toggleTab(tab) {
    currentTab = tab;
    currentPage = 1;
    document.getElementById('collection').style.display = tab === 'collection' ? 'flex' : 'none';
    document.getElementById('wantlist').style.display = tab === 'wantlist' ? 'flex' : 'none';
    displayPage();
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadInitialCollection();
    loadAllCollection();
    loadAllWants();
    toggleTab(currentTab);

    document.getElementById('collection-tab').addEventListener('click', () => toggleTab('collection'));
    document.getElementById('wantlist-tab').addEventListener('click', () => toggleTab('wantlist'));
});
