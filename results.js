// Function to hide the loading screen after 1.5 seconds
function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.style.display = 'none';
}

// Wait for 1.5 seconds before hiding the loading screen
setTimeout(hideLoadingScreen, 1500);

// Retrieve the search results data from the URL
const params = new URLSearchParams(window.location.search);
let search = params.get("search");

// Clean the search query to avoid regex issues
const cleanedSearch = search
    .replace(/<br>/gi, ' ')
    .trim();

// Escape special characters in the cleaned search query to avoid regex issues
const escapedSearch = cleanedSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Update the pattern to handle parentheses
let pattern = new RegExp(
    `.*${escapedSearch.replace(/\(/g, '\\(').replace(/\)/g, '\\)')}.*`,
    'i'
);

let searchResults_heading = document.createElement("h1");
searchResults_heading.id = "search-results-heading";
searchResults_heading.innerText = "Search Results for " + search;
searchResultsContainer = document.getElementById("search-results-container");

// Use the data to populate the search results container
const searchResults = document.getElementById("search-results");

const fetchJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    return await response.json();
};

const processData = async () => {
    const deviceFiles = [
        "MacBook.json",
        "AppleTV.json"
        // Add other device JSON file names here
    ];

    const data = [];

    for (const file of deviceFiles) {
        try {
            const jsonData = await fetchJSON(`TestModels/${file}`);
            data.push(jsonData);
        } catch (error) {
            console.error(`Error fetching ${file}: ${error}`);
        }
    }

    console.log("Data: ", data);

    const filtData = [];

    for (let i = 0; i < data.length; i++) {
        const deviceInfo = data[i];

        for (let j = 0; j < deviceInfo.length; j++) {
            if (deviceInfo[j].Name.includes(search)) {
                filtData.push(deviceInfo[j]);
            }
        }
    }

    console.log("Filtered Data: ", filtData);


    let footer = document.createElement("footer");
    footer.setAttribute("class", "footer");
    footer.innerText = returnString; // Replace with your footer content

    if (filtData.length === 0) {
        const notFoundMessage = document.createElement("p");
        notFoundMessage.innerHTML = "Not Found :("
        notFoundMessage.style.textAlign = "center";
        notFoundMessage.style.position = "absolute";
        notFoundMessage.style.fontWeight = "bold";
        notFoundMessage.style.fontSize = "2rem";
        searchResults.appendChild(notFoundMessage);

        const requestMsg = document.createElement("p");
        requestMsg.innerHTML = "If you want to request a device, please contact me <br> \
            On Twitt" +
                "er: <a class='linkNotFound' href='https://twitter.com/@NoContent_06'> @NoConte" +
                "nt_06 </a> <br> \
            On Discord: <a class='linkNotFound' href='https:" +
                "//discord.gg/hyTP8ynDAz'>AppleGuy#7469</a><br> \
            On Reddit: <a cla" +
                "ss='linkNotFound' href='https://reddit.com/u/ytnocontent06'>u/ytnocontent06</a" +
                ">";
        requestMsg.style.textAlign = "center";
        requestMsg.style.fontWeight = "bold";
        requestMsg.style.fontSize = "1.5rem";
        notFoundMessage.appendChild(requestMsg);

        let notFoundFooter = document.createElement("footer");
        notFoundFooter.setAttribute("class", "footer");
        notFoundFooter.innerText = "Your not found footer content here"; // Replace with your not found footer content
        notFoundFooter.style.position = "absolute";
        notFoundFooter.style.bottom = "0";
        notFoundFooter.style.width = "100%";
        notFoundFooter.style.textAlign = "center";
        notFoundFooter.style.fontSize = "1rem";
        notFoundFooter.style.fontWeight = "normal";
        notFoundFooter.style.color = "gray";
        notFoundFooter.style.marginBottom = "5vh";
        document
            .body
            .appendChild(notFoundFooter);
    } else if (filtData.length === 1) {
        let model = filtData[0]
            .Info
            .Overview["Model Identifier"]
            .replace(/ /g, "")
            .replace("(", "")
            .replace(")", "");
        location.href = `detailed.html?model=${model}&type=${filtData[0].Type}`;
    } else {
        for (let index = 0; index < filtData.length; index++) {
            const item = filtData[index];

            const result = document.createElement("div");
            result
                .classList
                .add("result");

            // Create image element
            let image = document.createElement("img");
            image.src = `img/${item.image}`;
            image.id = `result-image-${item
                .Info
                .Overview["Model Identifier"]
                .replace(/,/g, "")}`;
            image
                .classList
                .add("result_img");
            result.prepend(image);

            const text = document.createElement("div");
            let MId = item
                .Info
                .Overview["Model Identifier"];
            MId = MId.replace(/_/g, " ");
            text
                .classList
                .add("result__text");
            text.innerHTML = `<p class="mid_text_result">${item
                .Name}</p>
            <p id='mid_text_${item
                .Info
                .Overview["Model Identifier"]
                .replace(/,/g, "")
                .replace(/ /g, "")
                .replace("(", "")
                .replace(")", "")}'>${MId} </p>`;
            result.appendChild(text);
            searchResults.appendChild(result);

            // Add event listener to each result element
            result.addEventListener("click", function () {
                // Get the index of the selected result in the filtData array
                const selectedIndex = index;

                // Redirect the user to the detailed page with the selected index
                location.href = `detailed.html?index=${selectedIndex}&type=${item.Type}`;
            });

        }

        searchResults.appendChild(footer);
    }
    searchResults_heading.style.textAlign = "center";
    document
        .body
        .insertBefore(searchResults_heading, searchResultsContainer);
};

processData().catch((error) => {
    console.error(error);
});
