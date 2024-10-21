window.apiKey = "IuvD1L_Ez9yMFOJILH7OwJTuMP2pyuwcrcq5quAVvvk";

function createDOMMarker(data, map) {
    console.log("From map" + data[0].lat);
    data.forEach(item => {
        const { lat, long: lng, id: _id, location: Location } = item; // Change long to lng

        // Validate if lat and lng are valid numbers
        if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
            console.error('Invalid coordinates:', lat, lng);
            return; // Skip if coordinates are invalid
        }
        console.log(item.id + " " + item.location);
        // Create a DOM element for the custom marker
        let outerElement = document.createElement('div');
        outerElement.className = 'expandable-div';
        outerElement.innerHTML = `<div class="expandable-content"> <p class="name"> ${item.id}</p> <p class="email">${item.location}</p> </div>`;


        let domIcon = new H.map.DomIcon(outerElement, {
            onAttach: function (clonedElement) {
                // Add event listeners for opacity change (if needed) 
                clonedElement.addEventListener('mouseover', () => {
                    clonedElement.style.zIndex = 1000;
                    clonedElement.style.backgroundColor = "white";
                    clonedElement.style.color = "rgb(0, 131, 39)";
                    clonedElement.style.border = "2px solid green";
                });
                clonedElement.addEventListener('mouseout', () => {
                    clonedElement.style.zIndex = '';
                    clonedElement.style.opacity = 1;
                    clonedElement.style.backgroundColor = "rgb(0, 131, 39)";
                    clonedElement.style.border = "4px solid rgb(165, 255, 165)";

                });
                clonedElement.addEventListener('click', () => {
                    window.location.href = '../UserDetails.html?location=' + encodeURIComponent(item.location) + '&id=' + encodeURIComponent(item.id);
                });
            }
            ,

            onDetach: function (clonedElement) {

            }
        });
        let marker = new H.map.DomMarker({ lat: lat, lng: lng }, { icon: domIcon });
        map.addObject(marker);
    });
}


function addMarkersToMap(map) {
    $.ajax({
        url: '../php/map.php',
        method: 'GET',
        success: function (data) {
            createDOMMarker(data, map);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Failed to fetch data: ' + textStatus + ' - ' + errorThrown);
        }
    });
}

// Initialize the platform object:
var platform = new H.service.Platform({
    apikey: window.apiKey
});

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
    document.getElementById('map'),
    defaultLayers.vector.normal.map,
    {
        center: { lat: 50, lng: 5 },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1
    }
);

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(mapEvents);

// Create the default UI components:
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Resize the map when the window is resized
window.addEventListener('resize', () => map.getViewPort().resize());

// Now use the map as required...
window.onload = function () {
    addMarkersToMap(map);
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var currentLocation = {
                lat: 28.753440363878514,
                lng: 77.4970985865066
            };

            // Center the map on the user's current location
            map.setCenter(currentLocation);
            map.setZoom(16);

            // Add a marker at the current location
            var currentLocationMarker = new H.map.Marker(currentLocation);
            map.addObject(currentLocationMarker);
        }, function (error) {
            alert('Unable to retrieve your location. Please check your location settings.');
        }, {
            enableHighAccuracy: true, // Request high accuracy location
            timeout: 10000,           // Set a timeout (optional)
            maximumAge: 0             // Do not use a cached location
        });

    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Call the function to get current location when the page loads
getCurrentLocation();