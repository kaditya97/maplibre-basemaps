# maplibre-basemaps
### Maplibre plugin to add basemaps layer switcher

Check the demo here [Link](https://kaditya97.github.io/maplibre-basemaps/)

## Install

```bash
npm install maplibre-gl maplibre-basemaps
```

or

```html
<link href="https://unpkg.com/maplibre-gl@2.2.0/dist/maplibre-gl.css" rel="stylesheet" />
<script src="https://unpkg.com/maplibre-gl@2.2.0/dist/maplibre-gl.js"></script>
<script src="https://unpkg.com/maplibre-basemaps@0.0.5/dist/maplibre-basemaps.js"></script>
```

## Usage
```jsx
import Maplibre from 'maplibre-gl';
import BasemapControl from 'maplibre-basemaps';
```

## Example usage
Check docs/index.html for example implementation.
```Javascript
const osm = {
    name: "Open Street Map",
    tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
    maxzoom: 18,
    attribution: 'osm'
}
const osmHot = {
    name: "OSM HOT",
    tiles: ['https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'],
}
const osmCycle = {
    name: "OSM Cycle",
    tiles: ['https://a.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'],
}
const esriTerrain = {
    name: "Esri Terrain",
    tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}'],
    maxzoom: 13,
    attribution: 'Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS',
}
const baseLayers = {
    osm,
    osmHot,
    osmCycle,
    esriTerrain,
}
const basemapControl = new BasemapControl({ basemaps: baseLayers, initialBasemap: "osmHot"  });
map.addControl(basemapControl, 'top-right');
```

### Remove

```Javascript
map.removeControl(basemapControl);
```

### Options for use

- `basemaps` - BaseLayerConfig, base layers objects, **required**
- `initialBasemap` - string, basemap key to visualize, **default: first basemap**
- `width` - string, width for basemaps layers container, **default: '150px'**
- `height` - string, height for basemaps layers container, **default: '100px'**
- `keepOpen` - boolean, keep radiocontrol open, change state only when layercontrol button is clicked **default: false**

Layer Configuration
- `name` - string, name to visualize layer in container, **required**
- `tiles` - string[], urls of basemap layer, **required**
- `attribution` - string, attribution for basemap layer, **optional**
- `minZoom` - number, min zoom to display the grid, **default: 0**
- `maxZoom` - number, max zoom to display the grid , **default: 20**

