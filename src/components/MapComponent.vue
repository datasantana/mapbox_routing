<template>
    <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import routeData from '../assets/test_route.json';


const mapContainer = ref(null);
let map = null;
let mapboxglAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
let mapStyle = 'mapbox://styles/mapbox/outdoors-v12'; // Default map style
let mapPosition = {
    mapCenter: [-101.5731833069, 26.5346045702], // Default center [lng, lat]
    mapZoom: 7.5, // Default zoom level
}

// Set Mapbox access token from environment variable
mapboxgl.accessToken = mapboxglAccessToken

// Methods
const initializeMap = () => {
    if (mapContainer.value) {
        map = new mapboxgl.Map({
            container: mapContainer.value,
            style: mapStyle,
            center: mapPosition.mapCenter,
            zoom: mapPosition.mapZoom,
        });

        // Add navigation controls to the map
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }
};

const getRoute = (wayPoints) => {
    // This function should implement the logic to fetch routes based on waypoints
    // For now, it just logs the waypoints
    console.log('Fetching routes for waypoints:', wayPoints);
};

const addDataToMap = (data) => {
    if (map && data && data.routes && data.routes.length > 0) {
        // Remove existing route source and layer if they exist
        if (map.getSource('route')) {
            map.removeLayer('route');
            map.removeSource('route');
        }

        // Add source and layer to the map
        map.addSource('route', {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {},
                geometry: data.routes[0].geometry // This should contain coordinates and type
            }
        });

        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
            }
        });

        // Fit map to route bounds
        const coordinates = data.routes[0].geometry.coordinates;
        const bounds = coordinates.reduce((bounds, coord) => {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        map.fitBounds(bounds, {
            padding: 50
        });
    }
};

// Lifecycle hooks
onMounted(() => {
    initializeMap();
    console.log('Map initialized');
    // If routeData is available, add it to the map
    if (routeData) {
        // Wait for map to load before adding data
        if (map) {
            map.on('load', () => {
                addDataToMap(routeData);
            });
        } else {
            // If map is not yet created, use a timeout
            setTimeout(() => {
                addDataToMap(routeData);
            }, 1000);
        }
        console.log(routeData);
    }
});

onUnmounted(() => {
    if (map) {
        map.remove();
    }
});
</script>

<style>
/* 
    These styles make the map container fill the entire viewport.
    You might want to move these to a global stylesheet if they affect other parts of your app.
*/
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden; /* Prevents scrollbars from appearing */
}

.map-container {
    width: 100%;
    height: 100vh;
}
</style>