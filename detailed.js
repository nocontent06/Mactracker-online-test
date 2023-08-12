// Get the query parameters from the URL
const params = new URLSearchParams(window.location.search);
const index = params.get("index");
const type = params.get("type");

fetch(`TestModels/${type}.json`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // Use the data to populate the detailed view container
        const detailedViewContainer = document.getElementById("detailed-view-container");
        const detailedView = document.getElementById("detailedView");
        const detailed_heading = document.createElement("h1");
        detailed_heading.innerHTML = data[index].Name; // Use the index to get the correct data item
        detailed_heading.classList.add("detailed_heading");
        document.body.prepend(detailed_heading);

        // Create image element
        let image = document.createElement("img");
        image.src = `..\\img\\${data[index].image}`; // Use the index to get the correct image URL
        image.id = `detailed-image-${data[index].Info.Overview["Model Identifier"].replace(",", "")}`;
        image.classList.add("img-detail");
        document.body.insertBefore(image, detailedViewContainer);

        for (let key in data[index].Info) {
            const item_container = document.createElement("div");
            item_container.setAttribute("data-aos", "fade-up")
            item_container.classList.add("item-container");
            item_container.innerHTML += `<h2 class="item_heading">${key}</h2>`;

            for (let detail in data[index].Info[key]) {
                let infoKey = String(data[index].Info[key][detail]);
                infoKey = infoKey.replace(/_/g, " ")
                item_container.innerHTML += `<p>
                    <strong>${detail}:</strong> ${infoKey}
                </p>`;
            }
            detailedView.appendChild(item_container);
        }

        let footer_detailed = document.createElement("footer");
        footer_detailed.setAttribute("class", "footer");
        footer_detailed.innerText = returnString;

        document.body.appendChild(footer_detailed);
        
        detailedViewContainer.appendChild(detailedView);
    });
