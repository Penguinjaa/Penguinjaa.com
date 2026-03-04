const USERNAME = "Penguinjaa";
const API_KEY = "723abc8e1f09b7ce4d766fa3866662d6";
const BASE_URL = `https://lastfm-last-played.biancarosa.com.br/${USERNAME}/latest-song`;

const cleanSongTitle = (title) =>
  title.replace(/\(feat.*?\)|\(ft\..*?\)|\(with.*?\)|\[feat.*?\]|\[ft\..*?\]|\[with.*?\]/gi, "");

let lastfmPlaying = false;

const getTrack = async () => {
  const r = await fetch(BASE_URL);
  const j = await r.json();

  lastfmPlaying = j.track["@attr"]?.nowplaying || false;
  const img =
    j.track.image[2]["#text"] ===
    "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png"
      ? "https://penguinjaa.com/images/assets/cover.png"
      : j.track.image[2]["#text"];
  const name = cleanSongTitle(j.track.name);
  const link = `https://www.last.fm/music/${encodeURIComponent(
    j.track.artist["#text"]
  )}/_/${encodeURIComponent(j.track.name)}`;

  document.getElementById("listening").innerHTML = `
    <img src="${img}">
    <div id="trackInfo">
      <h3 id="trackName"><a href="${link}" target="_blank" style="text-decoration:none;">${name}</a></h3>
      <h3 id="artistName">${j.track.artist["#text"]}</h3>
      <div id="lastlistened"></div>
    </div>
  `;

  if (!lastfmPlaying) {
    const lastTime = parseInt(j.track.date.uts) * 1000;
    const delta = Math.floor((Date.now() - lastTime) / 1000);
    let timeAgo = "";
    if (delta < 60) timeAgo = `${delta} seconds ago`;
    else if (delta < 3600) timeAgo = `${Math.floor(delta / 60)} minutes ago`;
    else if (delta < 86400) timeAgo = `${Math.floor(delta / 3600)} hours ago`;
    else timeAgo = `${Math.floor(delta / 86400)} days ago`;
    document.getElementById("lastlistened").innerText = "Listened " + timeAgo;
  } else {
    document.getElementById("lastlistened").innerText = "";
  }
};

const LASTFM_PLACEHOLDER = "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png";

const getTopWeekly = async () => {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${USERNAME}&period=7day&limit=5&api_key=${API_KEY}&format=json`;
  const r = await fetch(url);
  const j = await r.json();
  const tracks = j.toptracks?.track || [];

  const container = document.getElementById("topWeekly");
  if (!container) return;

  const tracksWithArt = await Promise.all(tracks.map(async (track) => {
    const infoUrl = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${encodeURIComponent(track.artist.name)}&track=${encodeURIComponent(track.name)}&format=json`;
    const infoR = await fetch(infoUrl);
    const infoJ = await infoR.json();
    const rawImg = infoJ.track?.album?.image?.[1]?.["#text"] || "";
    const img = (!rawImg || rawImg === LASTFM_PLACEHOLDER)
      ? "https://penguinjaa.com/images/assets/cover.png"
      : rawImg;
    return { ...track, resolvedImg: img };
  }));

  container.innerHTML = tracksWithArt.map((track, i) => {
    const name = cleanSongTitle(track.name);
    const artist = track.artist.name;
    const plays = track.playcount;
    const img = track.resolvedImg;
    const link = track.url;
    return `
      <div class="top-track">
        <span class="top-track-rank">${i + 1}</span>
        <img class="top-track-art" src="${img}" alt="${name}">
        <div class="top-track-info">
          <a href="${link}" target="_blank" class="top-track-name">${name}</a>
          <span class="top-track-artist">${artist}</span>
        </div>
        <span class="top-track-plays">${plays}</span>
      </div>
      ${i < tracks.length - 1 ? '<div class="top-track-divider"></div>' : ''}
    `;
  }).join("");
};

getTrack();
getTopWeekly();
setInterval(getTrack, 5000);
setInterval(getTopWeekly, 600000);