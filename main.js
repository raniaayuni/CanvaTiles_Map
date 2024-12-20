import Map from 'https://cdn.skypack.dev/ol/Map.js';
import TileLayer from 'https://cdn.skypack.dev/ol/layer/Tile.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import OSM from 'https://cdn.skypack.dev/ol/source/OSM.js';
import TileDebug from 'https://cdn.skypack.dev/ol/source/TileDebug.js';
import {fromLonLat, toLonLat} from 'https://cdn.skypack.dev/ol/proj.js';

// Create the map
const map = new Map({
  target: 'map', // Target the div with id="map"
  layers: [
    new TileLayer({
      source: new OSM(), // Use OpenStreetMap as the base layer
    }),
    new TileLayer({
      source: new TileDebug({
        projection: 'EPSG:3857',
        tileGrid: undefined, // Default to OpenStreetMap tiling scheme
      }),
    }),
  ],
  view: new View({
    center: fromLonLat([0, 0]), // Center the map at coordinates [0, 0]
    zoom: 2, // Set initial zoom level
  }),
});

// Add click event listener to display coordinates
const info = document.getElementById('info');
map.on('click', function (event) {
  const coordinates = toLonLat(event.coordinate);
  const lon = coordinates[0].toFixed(6);
  const lat = coordinates[1].toFixed(6);
  info.innerHTML = `Longitude: ${lon}, Latitude: ${lat}`;
});
