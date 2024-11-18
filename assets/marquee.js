const quotes = [
    "SOMETIMES YOU NEED TO GET RID OF EVERYTHING",
    "FOR ME GIVING UP IS WAY HARDER THAN TRYING",
    "ALSO TRY SLOAN.NEKOWEB.ORG!",
    "ALSO TRY LOEVI.ART!",
    "BELL PEPPER SUMMER",
    "No way Spirited Away is better than Akira... NOOO WAAAY... sorry was just looking at a youtube of top 10 anime films"
];

let showColon = true;
let quote = quotes[Math.floor(Math.random() * quotes.length)];
let visitorsCount = "LOADING...";
let followersCount = "LOADING...";
let lastUpdated = "LOADING...";

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const colon = showColon ? "visible" : "hidden";
    showColon = !showColon;
    return `${hours}<span style="visibility: ${colon};">:</span>${minutes}`;
}

async function getStats() {
    const username = "penguinjaa";
    try {
        const request = await fetch(`https://nekoweb.org/api/site/info/${username}`);
        const json = await request.json();
        visitorsCount = `${json.views}`;
        followersCount = `${json.followers} Followers`;
        lastUpdated = `Last Updated: ${new Date(json.updated_at).toLocaleDateString()}`;
    } catch (error) {
        console.error("Error fetching stats:", error);
    }
}

function updateMarquee() {
    document.getElementById('top-marquee').innerHTML = 
        `WELCOME TO PENGUINJAA.COM v5.55 // YOU ARE VISITOR #${visitorsCount} // ${getCurrentTime()} // ${quote}`;
}

getStats();
updateMarquee();

setInterval(updateMarquee, 750); 
setInterval(getStats, 120000);