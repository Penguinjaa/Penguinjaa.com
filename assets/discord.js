const DISCORD_ID = "264257846496067586";

const getDiscordStatus = async () => {
  const r = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
  const j = await r.json();
  const d = j.data;
  const u = d.discord_user;

  const avatarExt = u.avatar.startsWith("a_") ? "gif" : "png";
  document.getElementById("discordAvatar").src = `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${avatarExt}`;

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

getDiscordStatus();
setInterval(getDiscordStatus, 10000);