fetch('media.json')
    .then(response => response.json())
    .then(data => {
        const movieContainer = document.getElementById('movies');
        movieContainer.innerHTML = '<h2>MOVIE LOG</h2>';
        data.movies.forEach((movie, i) => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('entry');
            movieDiv.id = `movie${i + 1}`;
            movieDiv.innerHTML = `
                <div class="cover"><img src="${movie.cover}" alt="${movie.title}" loading="lazy"></div>
                <h2>${movie.title} // ${movie.year}</h2>
                <h3>${movie.rating}/100 // WATCHED ${movie.date}</h3>
                <p>${movie.review}</p>`;
            movieContainer.appendChild(movieDiv);
        });

        const musicContainer = document.getElementById('music');
        data.albums.forEach((album, i) => {
            const albumDiv = document.createElement('div');
            albumDiv.classList.add('entry');
            albumDiv.id = `music${i + 1}`;
            albumDiv.innerHTML = `
                <div class="albumdetails">
                    <div class="cover"><img src="${album.cover}" alt="${album.title}" loading="lazy"></div>
                    <h2>${album.title} (${album.year})</h2>
                    <h5>${album.artist}</h5>
                    <h3>${album.rating}/100 // LISTENED ${album.date}</h3>
                </div>
                <h5>FAVORITE TRACKS: ${album.favorite_songs}</h5>
                <!--<p>${album.review}</p>-->`;
            musicContainer.appendChild(albumDiv);
        });

        const otherContainer = document.getElementById('other');
        otherContainer.innerHTML = '<h2>OTHER LOG</h2>';
        data.other.forEach((item, i) => {
            const otherDiv = document.createElement('div');
            otherDiv.classList.add('entry');
            otherDiv.id = `other${i + 1}`;
            otherDiv.innerHTML = `
                <div class="cover"><img src="${item.cover}" alt="${item.title}" loading="lazy"></div>
                <h2>${item.title} // ${item.date}</h2>
                <h3>RATING: ${item.rating}/100</h3>
                <p>${item.review}</p>`;
            otherContainer.appendChild(otherDiv);
        });

        const hash = window.location.hash;
        if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    })
    .catch(err => console.error('Error loading media data:', err));
