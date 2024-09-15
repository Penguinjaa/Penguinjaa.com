const lastfmapiKey = "723abc8e1f09b7ce4d766fa3866662d6";
const lastfmusername = "penguinjaa";

function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minutes ago`;
    } else {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hours ago`;
    }
}

function removeTextInParentheses(input) {
    // Replace text inside parentheses that starts with "feat" (with or without a period)
    return input.replace(/\(feat(\.| )?.*?\)/i, '');
}

function updateSongInfo() {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastfmusername}&api_key=${lastfmapiKey}&format=json&limit=1`)
        .then(response => response.json())
        .then(data => {
            const track = data.recenttracks.track[0];
            const artist = track.artist["#text"];
            const song = track.name;
            const cleanedSong = removeTextInParentheses(song); // Clean the song title
            const album = track.album["#text"];
            let albumCover = track.image[3]["#text"];
            let lastPlayed = "";

            if (track["@attr"] && track["@attr"].nowplaying === "true") {
                document.getElementById("listeningStatus").textContent = "Currently Listening:";
                lastPlayed = "";
            } else if (track.date && track.date.uts) {
                document.getElementById("listeningStatus").textContent = "Last Song:";
                const lastPlayedTimestamp = parseInt(track.date.uts, 10) * 1000;
                const lastPlayedDate = new Date(lastPlayedTimestamp);
                lastPlayed = `Played ${timeSince(lastPlayedDate)}`;
            }

            if (albumCover === 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png') {
                albumCover = 'https://www.penguinjaa.com/images/cover.png';
            }

            document.getElementById("albumCover").src = albumCover;
            document.getElementById("songInfo").innerHTML = `<a href="${track.url}" target="_blank" style="text-decoration: none; color: #d6d1bc;"><b>${cleanedSong}</b></a>`;
            document.getElementById("albumArtistInfo").textContent = `${artist}`;
            document.getElementById("lastPlayedInfo").textContent = lastPlayed;
        })
        .catch(error => console.error(error));
}

updateSongInfo();

setInterval(updateSongInfo, 5000);