async function populateCurrently() {
    try {
        const dataResponse = await fetch("/medialog/activity.json");
        if (!dataResponse.ok) throw new Error("Failed to fetch activity data.");
        
        const data = await dataResponse.json();

        const currentlyDiv = document.getElementById("currently");
        if (currentlyDiv && data?.currently) {
            currentlyDiv.innerHTML = `
            <h2>CURRENTLY...</h2>
                <h4><b>Watching:</b></h4>
                ${data.currently.watching.map(item => `<p>${item}</p>`).join('')}
                <h4><b>Playing:</b></h4>
                ${data.currently.playing.map(item => `<p>${item}</p>`).join('')}
                <h4><b>Reading:</b></h4>
                ${data.currently.reading.map(item => `<p>${item}</p>`).join('')}
            `;
        }
    } catch (error) {
        console.error("Error populating currently section:", error);
    }
}

document.addEventListener("DOMContentLoaded", populateCurrently);
