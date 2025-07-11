<template>
    <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';

const mapContainer = ref(null);
let map = null;

// IMPORTANT: Replace with your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2Vvc3R1ZGlvIiwiYSI6ImNrNWk5Mmp5eDBjNHQzbW10M3d6NzI1Y28ifQ.MPmtingHT1zi_Wk5ZxW8wA';

onMounted(() => {
    if (mapContainer.value) {
        map = new mapboxgl.Map({
            container: mapContainer.value,
            style: 'mapbox://styles/mapbox/streets-v12', // or any other map style
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9, // starting zoom
        });
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