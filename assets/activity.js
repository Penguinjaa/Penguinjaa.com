const USERNAME = "Penguinjaa";
const BASE_URL = `https://lastfm-last-played.biancarosa.com.br/${USERNAME}/latest-song`;
const DISCORD_ID = "264257846496067586";

const cleanSongTitle = (title) =>
  title.replace(/\(feat.*?\)|\(ft\..*?\)|\(with.*?\)|\[feat.*?\]|\[ft\..*?\]|\[with.*?\]/gi, "");

let lastfmPlaying = false;

const getTrack = async () => {
  const r = await fetch(BASE_URL);
  const j = await r.json();

  lastfmPlaying = j.track['@attr']?.nowplaying || false;
  const img =
    j.track.image[2]['#text'] ===
    "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png"
      ? "https://penguinjaa.com/images/assets/cover.png"
      : j.track.image[2]['#text'];
  const name = cleanSongTitle(j.track.name);
  const link = `https://www.last.fm/music/${encodeURIComponent(
    j.track.artist['#text']
  )}/_/${encodeURIComponent(j.track.name)}`;

  document.getElementById("listening").innerHTML = `
    <img src="${img}">
    <div id="trackInfo">
      <h3 id="trackName"><a href="${link}" target="_blank" style="text-decoration:none;">${name}</a></h3>
      <h3 id="artistName">${j.track.artist['#text']}</h3>
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

const getDiscordStatus = async () => {
  const r = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
  const j = await r.json();
  const d = j.data;
  const u = d.discord_user;

  document.getElementById("discordAvatar").src = `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png`;

  const custom = d.activities.find((a) => a.type === 4);
  const emoji = custom?.emoji?.id
    ? `<img src="https://cdn.discordapp.com/emojis/${custom.emoji.id}.${custom.emoji.animated ? "gif" : "png"}" height="16" style="vertical-align: middle;">`
    : custom?.emoji?.name || "";
  const statusText = custom?.state?.trim() || "zen and monklike";
  document.getElementById("discordStatus").innerHTML = `${emoji} ${statusText}`;

  const statusDot = document.getElementById("status");
  switch (d.discord_status) {
    case "online":
      statusDot.style.backgroundColor = "lime";
      break;
    case "idle":
      statusDot.style.backgroundColor = "orange";
      break;
    case "dnd":
      statusDot.style.backgroundColor = "red";
      break;
    default:
      statusDot.style.backgroundColor = "gray";
  }

  const excludedApps = ["Apple Music", "Visual Studio Code"];
  const activity = d.activities.find(
    (a) => a.type === 0 && !excludedApps.includes(a.name)
  );

  const block = document.getElementById("discordActivityBlock");
  const img = document.getElementById("discordActivityImg");
  const title = document.getElementById("discordActivityTitle");
  const subtitle = document.getElementById("discordActivitySubtitle");

  if (activity) {
    let largeImage = "https://penguinjaa.com/images/assets/cover.png";

    if (activity.application_id) {
      largeImage = `https://dcdn.dstn.to/app-icons/${activity.application_id}.png?size=128`;
    } else if (activity.assets?.large_image) {
      largeImage = activity.assets.large_image.startsWith("mp:")
        ? activity.assets.large_image.replace("mp:", "https://media.discordapp.net/")
        : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
    }

    img.src = largeImage;
    title.innerText = activity.name || "";

    const playTimeEl = document.getElementById("discordPlayTime");
    const showPlayTime = activity.timestamps?.start;
    const updatePlayTime = () => {
      const now = Date.now();
      const delta = Math.floor((now - activity.timestamps.start) / 1000);
      const hours = Math.floor(delta / 3600);
      const minutes = Math.floor((delta % 3600) / 60);
      const seconds = delta % 60;
      const timeStr =
        hours > 0
          ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
          : `${minutes}:${String(seconds).padStart(2, "0")}`;

      if (!activity.details) {
        subtitle.innerText = timeStr;
        playTimeEl.innerText = "";
      } else {
        subtitle.innerText = activity.details;
        playTimeEl.innerText = "Playing for: " + timeStr;
      }
    };

    if (showPlayTime) {
      updatePlayTime();
      clearInterval(window._discordTimer);
      window._discordTimer = setInterval(updatePlayTime, 1000);
    } else {
      subtitle.innerText = activity.details || "";
      playTimeEl.innerText = "";
      clearInterval(window._discordTimer);
    }

    block.style.display = "block";
  } else {
    block.style.display = "none";
  }

};

getTrack();
getDiscordStatus();
setInterval(getTrack, 5000);
setInterval(getDiscordStatus, 10000);
