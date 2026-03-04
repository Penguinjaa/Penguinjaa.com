const USERNAME = "Penguinjaa";
const API_KEY = "723abc8e1f09b7ce4d766fa3866662d6";
const LASTFM_PLACEHOLDER = "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png";
const FALLBACK_IMG = "https://penguinjaa.com/images/assets/cover.png";

const cleanSongTitle = (title) =>
  title.replace(/\(feat.*?\)|\(ft\..*?\)|\(with.*?\)|\[feat.*?\]|\[ft\..*?\]|\[with.*?\]/gi, "");

const isPlaceholder = (url) => !url || url === LASTFM_PLACEHOLDER;

const getTrack = async () => {
  const r = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${USERNAME}&limit=1&api_key=${API_KEY}&format=json`
  );
  const j = await r.json();
  const track = j.recenttracks?.track?.[0];
  if (!track) return;

  const nowPlaying = track["@attr"]?.nowplaying || false;
  const rawImg = track.image[2]["#text"];
  const img = isPlaceholder(rawImg) ? FALLBACK_IMG : rawImg;
  const name = cleanSongTitle(track.name);
  const link = `https://www.last.fm/music/${encodeURIComponent(
    track.artist["#text"]
  )}/_/${encodeURIComponent(track.name)}`;

  document.getElementById("listening").innerHTML = `
    <img src="${img}">
    <div id="trackInfo">
      <h3 id="trackName"><a href="${link}" target="_blank" style="text-decoration:none;">${name}</a></h3>
      <h3 id="artistName">${track.artist["#text"]}</h3>
      <div id="lastlistened"></div>
    </div>
  `;

  if (!nowPlaying) {
    const lastTime = parseInt(track.date.uts) * 1000;
    const delta = Math.floor((Date.now() - lastTime) / 1000);
    const timeAgo =
      delta < 60 ? `${delta} seconds ago` :
      delta < 3600 ? `${Math.floor(delta / 60)} minutes ago` :
      delta < 86400 ? `${Math.floor(delta / 3600)} hours ago` :
      `${Math.floor(delta / 86400)} days ago`;
    document.getElementById("lastlistened").innerText = "Listened " + timeAgo;
  } else {
    document.getElementById("lastlistened").innerText = "";
  }
};

const resolveArt = async (track) => {
  const quickImg = track.image?.[1]?.["#text"];
  if (!isPlaceholder(quickImg)) return quickImg;

  try {
    const r = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}` +
      `&artist=${encodeURIComponent(track.artist.name)}&track=${encodeURIComponent(track.name)}&format=json`
    );
    const j = await r.json();
    const img = j.track?.album?.image?.[1]?.["#text"];
    if (!isPlaceholder(img)) return img;
  } catch (_) {}

  return FALLBACK_IMG;
};

const getTopWeekly = async () => {
  const container = document.getElementById("topWeekly");
  if (!container) return;

  const r = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${USERNAME}&period=7day&limit=5&api_key=${API_KEY}&format=json`
  );
  const j = await r.json();
  const tracks = j.toptracks?.track || [];

  const tracksWithArt = await Promise.all(tracks.map(async (track) => ({
    ...track,
    resolvedImg: await resolveArt(track),
  })));

  container.innerHTML = tracksWithArt.map((track, i) => `
    <div class="top-track">
      <span class="top-track-rank">${i + 1}</span>
      <img class="top-track-art" src="${track.resolvedImg}" alt="${cleanSongTitle(track.name)}">
      <div class="top-track-info">
        <a href="${track.url}" target="_blank" class="top-track-name">${cleanSongTitle(track.name)}</a>
        <span class="top-track-artist">${track.artist.name}</span>
      </div>
      <span class="top-track-plays">${track.playcount}</span>
    </div>
    ${i < tracks.length - 1 ? '<div class="top-track-divider"></div>' : ''}
  `).join("");
};

getTrack();
getTopWeekly();
setInterval(getTrack, 5000);
setInterval(getTopWeekly, 600000);
