window.apiKey = "IuvD1L_Ez9yMFOJILH7OwJTuMP2pyuwcrcq5quAVvvk";

        function moveMapToBerlin(map){
            map.setCenter({lat:10.9277398, lng:78.7387890});
            map.setZoom(16);
        }

        function addMarkersToMap(map) {
            // Add markers or other functionalities here
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
                center: {lat:50, lng:5},
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
            moveMapToBerlin(map);
            addMarkersToMap(map);
        }