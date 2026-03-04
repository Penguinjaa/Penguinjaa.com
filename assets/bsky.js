const BSKY_HANDLE = "penguinjaa.com";

const getBluesky = async () => {
  const container = document.getElementById("bskyStatus");
  if (!container) return;

  const r = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${BSKY_HANDLE}&limit=5`);
  const j = await r.json();

  const item = j.feed?.find(f => !f.reason && !f.post.record?.reply && f.post.record?.text?.trim());
  if (!item) return;

  const post = item.post;
  const author = post.author;
  const rawText = post.record.text?.trim();
  const hasImage = post.record.embed?.$type?.includes("image") || post.embed?.$type?.includes("image");
  
  let text = rawText || "";
  if (hasImage) text = text ? `${text} [image]` : "[image]";
  if (!text) text = "[post]";
  const postUrl = `https://bsky.app/profile/${author.handle}/post/${post.uri.split("/").pop()}`;

  const ts = new Date(post.record.createdAt);
  const delta = Math.floor((Date.now() - ts) / 1000);
  let timeAgo = "";
  if (delta < 60) timeAgo = `${delta}s ago`;
  else if (delta < 3600) timeAgo = `${Math.floor(delta / 60)}m ago`;
  else if (delta < 86400) timeAgo = `${Math.floor(delta / 3600)}h ago`;
  else timeAgo = `${Math.floor(delta / 86400)}d ago`;

  container.innerHTML = `
    <div id="bskyInner">
      <p id="bskyText">${text}</p>
      <div id="bskyFooter">
        <a href="${postUrl}" target="_blank" id="bskyLink">view on bluesky →</a>
        <span id="bskyTime">${timeAgo}</span>
      </div>
    </div>
  `;
};

getBluesky();
setInterval(getBluesky, 60000);