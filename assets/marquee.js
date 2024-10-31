const quotes = [
    "SOMETIMES YOU NEED TO GET RID OF EVERYTHING",
    "FOR ME GIVING UP IS WAY HARDER THAN TRYING",
    "ALSO TRY SLOAN.NEKOWEB.ORG!",
    "ALSO TRY LOEVI.ART!",
    "BELL PEPPER SUMMER"
];
let showColon = true, quote = quotes[Math.floor(Math.random() * quotes.length)];

function getCurrentTime() {
    const now = new Date(), hours = String(now.getHours() % 12 || 12).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0'), colon = showColon ? ":" : " ";
    showColon = !showColon;
    return `${hours}${colon}${minutes}`;
}

function updateMarquee() {
    document.getElementById('top-marquee').textContent = `WELCOME TO PENGUINJAA.COM // ${getCurrentTime()} // ${quote}`;
}

updateMarquee();
setInterval(updateMarquee, 750);