async function populateCurrently() {
    try {
        const dataResponse = await fetch("/medialog/activity.json");
        if (!dataResponse.ok) throw new Error("Failed to fetch activity data.");
        
        const data = await dataResponse.json();

        const currentlyDiv = document.getElementById("currently");
        if (currentlyDiv && data?.currently) {
            currentlyDiv.innerHTML = `
            <h2>CURRENTLY...</h2>
                <h3>Watching:</h3>
                ${data.currently.watching.map(item => `<h5>${item}</h5>`).join('')}
                <h3>Playing:</h3>
                ${data.currently.playing.map(item => `<h5>${item}</h5>`).join('')}
                <h3>Reading:</h3>
                ${data.currently.reading.map(item => `<h5>${item}</h5>`).join('')}
            `;
        }
    } catch (error) {
        console.error("Error populating currently section:", error);
    }
}

document.addEventListener("DOMContentLoaded", populateCurrently);
