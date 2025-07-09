// Get the query parameters from the URL
const params = new URLSearchParams(window.location.search);

const paramIndex = params.get("index");
const type = params.get("type");

let modelNumberExisting = false; 

try {
    let modelNumber = null;

    if (paramIndex !== null) {
        // Handle the case with index and type
        console.error("Invalid usage: 'index' parameter should not be used for a single device.");
    } else {
        // Handle the case with only modelNumber and type
        modelNumber = params.get("modelNumber");

        if (modelNumber !== null) {
            // Now you can use the modelNumber as needed
            console.log("Model Number:", modelNumber);
            modelNumberExisting = true;
        } else {
            console.error("Model Number not found.");
        }
    }
} catch (error) {
    console.error(error);
}

let imgDetail = document.querySelector(".img-detail");

const searchFormNav = document.getElementById("search-form-nav");
const searchInputNav = document.getElementById("search-input-nav"); // search input
let linkTagNav = document.getElementById("a-bt"); // link

fetch(`Models/${type}.json`)
    .then(response => response.json())
    .then(data => {
        console.log("Data: ", data[0]);
        // Get index from ModelNumber:
        let mnrIndex = ""
        if (modelNumberExisting) {
            let modelNumberToFind = params.get("modelNumber");
            for (let i = 0; i < data.length; i++) {
                if (data[i].Info.Overview["Model Number"] == modelNumberToFind) {
                    mnrIndex = i;
                }
            }

            console.log("Index: ", mnrIndex);
        }

        // Use the data to populate the detailed view container
        const detailedViewContainer = document.getElementById("detailed-view-container");
        const detailedView = document.getElementById("detailedView");
        const detailed_heading = document.createElement("h1");

        if (modelNumberExisting) {
            detailed_heading.innerHTML = data[mnrIndex].Name;
        } else {
            detailed_heading.innerHTML = data[paramIndex].Name;
        }

        detailed_heading.classList.add("detailed_heading");
        document.body.insertBefore(detailed_heading, detailedViewContainer);

        // Create image element with proper centering and full visibility
        let imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        
        let image = document.createElement("img");

        if (modelNumberExisting) {
            image.src = `img/${data[mnrIndex].image}`;
            image.id = `detailed-image-${data[mnrIndex].Info.Overview["Model Number"].replace(",", "")}`;
            image.alt = data[mnrIndex].Name;
        } else { 
            image.src = `img/${data[paramIndex].image}`;
            image.id = `detailed-image-${data[paramIndex].Info.Overview["Model Number"].replace(",", "")}`;
            image.alt = data[paramIndex].Name;
        }
        
        image.classList.add("img-detail");
        
        // Ensure image loads properly and maintains aspect ratio
        image.onload = function() {
            console.log(`Image loaded: ${this.src}`);
            // Get natural dimensions and adjust if needed
            const naturalWidth = this.naturalWidth;
            const naturalHeight = this.naturalHeight;
            
            // If image is very small, allow it to display at natural size
            if (naturalWidth <= 200 && naturalHeight <= 200) {
                this.style.width = naturalWidth + 'px';
                this.style.height = naturalHeight + 'px';
            }
            // If image is large, respect the max-width/height constraints
            else {
                this.style.width = 'auto';
                this.style.height = 'auto';
            }
        };
        
        image.onerror = function() {
            console.error(`Failed to load image: ${this.src}`);
            this.style.display = 'none';
        };
        
        imageContainer.appendChild(image);
        document.body.insertBefore(imageContainer, detailedViewContainer);

        // Enhanced card creation with better structure
        if (modelNumberExisting) {
            for (let key in data[mnrIndex].Info) {
                const item_container = document.createElement("div");
                item_container.setAttribute("data-aos", "fade-up");
                item_container.classList.add("item-container");
                
                // Create header with icon
                const header = document.createElement("h2");
                header.className = "item_heading";
                
                // Create icon element
                const icon = document.createElement("span");
                icon.className = "material-symbols-outlined heading-icon";
                
                // Determine icon based on section name
                const sectionName = key.toLowerCase();
                if (sectionName.includes('overview') || sectionName.includes('general')) {
                    icon.textContent = 'info';
                } else if (sectionName.includes('processor') || sectionName.includes('cpu') || sectionName.includes('chip')) {
                    icon.textContent = 'memory';
                } else if (sectionName.includes('software') || sectionName.includes('operating') || sectionName.includes('os') || sectionName.includes('system')) {
                    icon.textContent = 'settings';
                } else if (sectionName.includes('memory') || sectionName.includes('ram') || sectionName.includes('storage')) {
                    icon.textContent = 'storage';
                } else if (sectionName.includes('graphics') || sectionName.includes('video') || sectionName.includes('gpu')) {
                    icon.textContent = 'memory';
                } else if (sectionName.includes('display') || sectionName.includes('screen') || sectionName.includes('resolution')) {
                    icon.textContent = 'monitor';
                } else if (sectionName.includes('network') || sectionName.includes('wifi') || sectionName.includes('ethernet') || sectionName.includes('connectivity')) {
                    icon.textContent = 'wifi';
                } else if (sectionName.includes('audio') || sectionName.includes('sound') || sectionName.includes('speaker')) {
                    icon.textContent = 'volume_up';
                } else if (sectionName.includes('port') || sectionName.includes('connection') || sectionName.includes('input') || sectionName.includes('output')) {
                    icon.textContent = 'cable';
                } else if (sectionName.includes('power') || sectionName.includes('battery') || sectionName.includes('energy')) {
                    icon.textContent = 'battery_full';
                } else if (sectionName.includes('physical') || sectionName.includes('dimension') || sectionName.includes('size') || sectionName.includes('weight')) {
                    icon.textContent = 'straighten';
                } else if (sectionName.includes('price') || sectionName.includes('cost') || sectionName.includes('msrp')) {
                    icon.textContent = 'payments';
                } else if (sectionName.includes('support') || sectionName.includes('compatibility') || sectionName.includes('requirement')) {
                    icon.textContent = 'support';
                } else if (sectionName.includes('camera') || sectionName.includes('photo') || sectionName.includes('video')) {
                    icon.textContent = 'photo_camera';
                } else if (sectionName.includes('security') || sectionName.includes('touch') || sectionName.includes('id') || sectionName.includes('biometric')) {
                    icon.textContent = 'fingerprint';
                } else if (sectionName.includes('keyboard') || sectionName.includes('input') || sectionName.includes('trackpad')) {
                    icon.textContent = 'keyboard';
                } else if (sectionName.includes('environmental') || sectionName.includes('temperature') || sectionName.includes('humidity')) {
                    icon.textContent = 'thermostat';
                } else if (sectionName.includes('packaging') || sectionName.includes('box') || sectionName.includes('included')) {
                    icon.textContent = 'inventory_2';
                } else if (sectionName.includes('timeline') || sectionName.includes('history') || sectionName.includes('release')) {
                    icon.textContent = 'schedule';
                } else {
                    // Default icon for unknown sections
                    icon.textContent = 'category';
                }
                
                // Create text span for the heading title
                const headerText = document.createElement("span");
                headerText.className = "heading-text";
                headerText.textContent = key;
                
                // Append icon and text to header
                header.appendChild(icon);
                header.appendChild(headerText);
                item_container.appendChild(header);
                
                // Create content container
                const contentContainer = document.createElement("div");
                contentContainer.className = "item-container-content";
                
                // Process each detail
                for (let detail in data[mnrIndex].Info[key]) {
                    let infoValue = String(data[mnrIndex].Info[key][detail]);
                    
                    // Create detail item
                    const detailItem = document.createElement("div");
                    detailItem.className = "detail-item";
                    
                    // Create label
                    const label = document.createElement("div");
                    label.className = "detail-label";

                    // Check if this is an OS type and the detail is "Model Identifier"
                    let labelText = detail.replace(/_/g, " ");
                    if ((type === "iOS" || type === "iPhoneOS" || type === "macOS" || type === "watchOS" || type === "iPadOS" || type === "visionOS") && 
                        detail === "Model Identifier") {
                        labelText = "Latest";
                    }

                    label.innerHTML = labelText;
                    
                    // Create value
                    const value = document.createElement("div");
                    value.className = "detail-value";
                    
                    // Determine value type and apply appropriate styling
                    if (detail.toLowerCase().includes('version') || detail.toLowerCase().includes('build')) {
                        value.className += " version-data";
                    } else if (detail.toLowerCase().includes('date') || detail.toLowerCase().includes('introduced')) {
                        value.className += " date-data";
                    } else if (detail.toLowerCase().includes('ram') || detail.toLowerCase().includes('storage') || detail.toLowerCase().includes('processor')) {
                        value.className += " spec-data";
                    }
                    
                    // Check if this is a Discontinued field and add status indicator
                    if (detail.toLowerCase().includes('discontinued')) {
                        value.className += " discontinued-data";
                        
                        // Create status container
                        const statusContainer = document.createElement("div");
                        statusContainer.className = "status-container";
                        
                        // Create status dot
                        const statusDot = document.createElement("span");
                        statusDot.className = "status-dot";
                        
                        // Determine if device is discontinued
                        const isDiscontinued = infoValue.toLowerCase().includes('yes') || 
                                             infoValue.toLowerCase().includes('true') ||
                                             (infoValue.toLowerCase() !== 'no' && 
                                              infoValue.toLowerCase() !== 'false' && 
                                              infoValue.toLowerCase() !== 'current' &&
                                              infoValue.toLowerCase() !== '--' &&
                                              infoValue.toLowerCase() !== '-' &&
                                              infoValue.toLowerCase() !== '---' &&
                                              infoValue.trim() !== '' &&
                                              infoValue.toLowerCase() !== 'n/a');
                        
                        if (isDiscontinued) {
                            statusDot.className += " discontinued";
                            statusDot.setAttribute('title', 'Device Discontinued');
                        } else {
                            statusDot.className += " current";
                            statusDot.setAttribute('title', 'Device Current');
                        }
                        
                        // Create text span
                        const statusText = document.createElement("span");
                        statusText.className = "status-text";
                        statusText.innerHTML = infoValue;
                        
                        statusContainer.appendChild(statusDot);
                        statusContainer.appendChild(statusText);
                        value.appendChild(statusContainer);
                    } else {
                        // Always use innerHTML for better rendering for non-discontinued fields
                        value.innerHTML = infoValue;
                    }
                    
                    detailItem.appendChild(label);
                    detailItem.appendChild(value);
                    contentContainer.appendChild(detailItem);
                }
                
                item_container.appendChild(contentContainer);
                detailedView.appendChild(item_container);
            }
        } else {
            for (let key in data[paramIndex].Info) {
                const item_container = document.createElement("div");
                item_container.setAttribute("data-aos", "fade-up");
                item_container.classList.add("item-container");
                
                // Create header with icon
                const header = document.createElement("h2");
                header.className = "item_heading";
                
                // Create icon element
                const icon = document.createElement("span");
                icon.className = "material-symbols-outlined heading-icon";
                
                // Determine icon based on section name
                const sectionName = key.toLowerCase();
                if (sectionName.includes('overview') || sectionName.includes('general')) {
                    icon.textContent = 'info';
                } else if (sectionName.includes('processor') || sectionName.includes('cpu') || sectionName.includes('chip')) {
                    icon.textContent = 'memory';
                } else if (sectionName.includes('software') || sectionName.includes('operating') || sectionName.includes('os') || sectionName.includes('system')) {
                    icon.textContent = 'settings';
                } else if (sectionName.includes('memory') || sectionName.includes('ram') || sectionName.includes('storage')) {
                    icon.textContent = 'storage';
                } else if (sectionName.includes('graphics') || sectionName.includes('video') || sectionName.includes('display')) {
                    icon.textContent = 'monitor';
                } else if (sectionName.includes('network') || sectionName.includes('wifi') || sectionName.includes('ethernet') || sectionName.includes('connectivity')) {
                    icon.textContent = 'wifi';
                } else if (sectionName.includes('audio') || sectionName.includes('sound') || sectionName.includes('speaker')) {
                    icon.textContent = 'volume_up';
                } else if (sectionName.includes('port') || sectionName.includes('connection') || sectionName.includes('input') || sectionName.includes('output')) {
                    icon.textContent = 'cable';
                } else if (sectionName.includes('power') || sectionName.includes('battery') || sectionName.includes('energy')) {
                    icon.textContent = 'battery_full';
                } else if (sectionName.includes('physical') || sectionName.includes('dimension') || sectionName.includes('size') || sectionName.includes('weight')) {
                    icon.textContent = 'straighten';
                } else if (sectionName.includes('price') || sectionName.includes('cost') || sectionName.includes('msrp')) {
                    icon.textContent = 'payments';
                } else if (sectionName.includes('support') || sectionName.includes('compatibility') || sectionName.includes('requirement')) {
                    icon.textContent = 'support';
                } else if (sectionName.includes('camera') || sectionName.includes('photo') || sectionName.includes('video')) {
                    icon.textContent = 'photo_camera';
                } else if (sectionName.includes('security') || sectionName.includes('touch') || sectionName.includes('id') || sectionName.includes('biometric')) {
                    icon.textContent = 'fingerprint';
                } else if (sectionName.includes('keyboard') || sectionName.includes('input') || sectionName.includes('trackpad')) {
                    icon.textContent = 'keyboard';
                } else if (sectionName.includes('environmental') || sectionName.includes('temperature') || sectionName.includes('humidity')) {
                    icon.textContent = 'thermostat';
                } else if (sectionName.includes('packaging') || sectionName.includes('box') || sectionName.includes('included')) {
                    icon.textContent = 'inventory_2';
                } else if (sectionName.includes('timeline') || sectionName.includes('history') || sectionName.includes('release')) {
                    icon.textContent = 'schedule';
                } else {
                    // Default icon for unknown sections
                    icon.textContent = 'category';
                }
                
                // Create text span for the heading title
                const headerText = document.createElement("span");
                headerText.className = "heading-text";
                headerText.textContent = key;
                
                // Append icon and text to header
                header.appendChild(icon);
                header.appendChild(headerText);
                item_container.appendChild(header);
                
                // Create content container
                const contentContainer = document.createElement("div");
                contentContainer.className = "item-container-content";
                
                // Process each detail
                for (let detail in data[paramIndex].Info[key]) {
                    let infoValue = String(data[paramIndex].Info[key][detail]);
                    
                    // Create detail item
                    const detailItem = document.createElement("div");
                    detailItem.className = "detail-item";
                    
                    // Create label
                    const label = document.createElement("div");
                    label.className = "detail-label";

                    // Check if this is an OS type and the detail is "Model Identifier"
                    let labelText = detail.replace(/_/g, " ");
                    if ((type === "iOS" || type === "iPhoneOS" || type === "macOS" || type === "watchOS" || type === "iPadOS" || type === "visionOS") && 
                        detail === "Model Identifier") {
                        labelText = "Latest";
                    }

                    label.innerHTML = labelText;
                    
                    // Create value
                    const value = document.createElement("div");
                    value.className = "detail-value";
                    
                    // Determine value type and apply appropriate styling
                    if (detail.toLowerCase().includes('version') || detail.toLowerCase().includes('build')) {
                        value.className += " version-data";
                    } else if (detail.toLowerCase().includes('date') || detail.toLowerCase().includes('introduced')) {
                        value.className += " date-data";
                    } else if (detail.toLowerCase().includes('ram') || detail.toLowerCase().includes('storage') || detail.toLowerCase().includes('processor')) {
                        value.className += " spec-data";
                    }
                    
                    // Check if this is a Discontinued field and add status indicator
                    if (detail.toLowerCase().includes('discontinued')) {
                        value.className += " discontinued-data";
                        
                        // Create status container
                        const statusContainer = document.createElement("div");
                        statusContainer.className = "status-container";
                        
                        // Create status dot
                        const statusDot = document.createElement("span");
                        statusDot.className = "status-dot";
                        
                        // Determine if device is discontinued
                        const isDiscontinued = infoValue.toLowerCase().includes('yes') || 
                                             infoValue.toLowerCase().includes('true') ||
                                             (infoValue.toLowerCase() !== 'no' && 
                                              infoValue.toLowerCase() !== 'false' && 
                                              infoValue.toLowerCase() !== 'current' &&
                                              infoValue.trim() !== '' &&
                                              infoValue.toLowerCase() !== 'n/a');
                        
                        if (isDiscontinued) {
                            statusDot.className += " discontinued";
                            statusDot.setAttribute('title', 'Device Discontinued');
                        } else {
                            statusDot.className += " current";
                            statusDot.setAttribute('title', 'Device Current');
                        }
                        
                        // Create text span
                        const statusText = document.createElement("span");
                        statusText.className = "status-text";
                        statusText.innerHTML = infoValue;
                        
                        statusContainer.appendChild(statusDot);
                        statusContainer.appendChild(statusText);
                        value.appendChild(statusContainer);
                    } else {
                        // Always use innerHTML for better rendering for non-discontinued fields
                        value.innerHTML = infoValue;
                    }
                    
                    detailItem.appendChild(label);
                    detailItem.appendChild(value);
                    contentContainer.appendChild(detailItem);
                }
                
                item_container.appendChild(contentContainer);
                detailedView.appendChild(item_container);
            }
        }
        
        detailedViewContainer.appendChild(detailedView);
        
        // Initialize footer after content is loaded
        initializeFooter();
    })
    .catch(error => {
        console.error('Error loading data:', error);
        // Show error message and still initialize footer
        initializeFooter();
    });

// Footer initialization function
function initializeFooter() {
    // Wait for main.js variables to be available
    setTimeout(() => {
        if (typeof version !== 'undefined' && typeof build !== 'undefined' && typeof commit !== 'undefined') {
            const versionInfoElements = document.querySelectorAll('.version-info');
            if (versionInfoElements.length >= 4) {
                versionInfoElements[0].textContent = `Version ${version} (Build ${build})`;
                versionInfoElements[1].textContent = `Commit: ${commit}`;
                versionInfoElements[2].textContent = `©2023-2025 MangoCoding-Inc. (Felix)`;
                versionInfoElements[3].textContent = "All rights reserved.";
            }
        }
    }, 300);
}






