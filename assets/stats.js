const getStats = async () => {
    const request = await fetch(`https://nekoweb.org/api/site/info/penguinjaa.com`);
    const json = await request.json();

    const updated = new Date(json.updated_at).toLocaleDateString();

    document.getElementById("visitors").innerHTML = `<p>Visits: ${json.views}</p>`;
    document.getElementById("followers").innerHTML = `<p>Followers: ${json.followers}</p>`;
    document.getElementById("updated").innerHTML = `<p>Last Updated: ${updated}</p>`;
};
getStats();