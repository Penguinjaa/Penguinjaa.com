const username = "penguinjaa";

const getStats = async () => {
    const request = await fetch(`https://nekoweb.org/api/site/info/${username}`);
    const json = await request.json();

    const updated = new Date(json.updated_at).toLocaleDateString();

    document.getElementById("visitors").innerHTML = `<em>Visits</em>: ${json.views}`;
    document.getElementById("followers").innerHTML = `<em>Followers</em>: ${json.followers}`;
    document.getElementById("updated").innerHTML = `<em>Last Updated</em>: ${updated}`;
};
getStats();