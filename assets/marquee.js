const quotes = [
    "SOMETIMES YOU NEED TO GET RID OF EVERYTHING",
    "FOR ME GIVING UP IS WAY HARDER THAN TRYING",
    "ALSO TRY SLOAN.NEKOWEB.ORG!",
    "BELL PEPPER SUMMER",
    "SOMETIMES I GET EMOTIONAL OVER FONTS",
    "HARDER, BETTER, FASTER, STRONGER",
    "I BELIEVE IN ALIENS I DONT BELIEVE IN LUCK",
    "MIKU, MIKU, WHATS IT LIKE TO BE YOU?",
    "THE EARTH IS JUST A ROCK WITHOUT THE VOICES OF ART",
    "NEO-TOKYO IS ABOUT TO EXPLODE",
    "MY NAME IS PINK AND IM REALLY GLAD TO MEET YOU",
    "DON'T TAP THE GLASS"
];

let showColon = true;
let quote = quotes[Math.floor(Math.random() * quotes.length)];

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const colon = showColon ? "visible" : "hidden";
    showColon = !showColon;
    return `${hours}<span style="visibility: ${colon};">:</span>${minutes}`;
}


function updateMarquee() {
    document.getElementById('top-marquee').innerHTML = 
        `WELCOME TO PENGUINJAA.COM // ${getCurrentTime()} // ${quote}`;
}

updateMarquee();

setInterval(updateMarquee, 750); 