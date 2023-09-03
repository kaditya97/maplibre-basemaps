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
<script src="https://unpkg.com/maplibre-basemaps@0.0.1/dist/maplibre-basemaps.js"></script>
```

## Usage
```jsx
import Maplibre from 'maplibre-gl';
import * as MaplibreBasemaps from 'maplibre-basemaps';
```

## Example usage
Check docs/index.html for example implementation.
```Javascript
const osm = {
    name: "Open Street Map",
    tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
    visibility: 'visible',
    maxzoom: 18,
    attribution: 'osm'
}
const osmHot = {
    name: "OSM HOT",
    tiles: ['https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'],
    visibility: 'none',
}
const osmCycle = {
    name: "OSM Cycle",
    tiles: ['https://a.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'],
    visibility: 'none'
}
const esriTerrain = {
    name: "Esri Terrain",
    tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}'],
    visibility: 'none',
    maxzoom: 13,
    attribution: 'Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS',
}
const baseLayers = {
    osm,
    osmHot,
    osmCycle,
    esriTerrain,
}
const basemapControl = new MaplibreBasemaps.Basemaps({ basemaps: baseLayers });
map.addControl(basemapControl, 'top-right');
```

### Remove

```Javascript
map.removeControl(basemapControl);
```

### Options for use

```Typescript
export interface BaseLayerConfig {
    name: string;
    tiles: Array<string>;
    visibility: 'visible' | 'none';
    attribution?: string;
    minZoom?: number;
    maxZoom?: number;
}

export interface BasemapsConfig {
    basemaps: BaseLayerConfig;
    width?: string;
    height?: string;
}

const basemapControl = new new MaplibreBasemaps.Basemaps(config: BasemapsConfig);
```

- `basemaps` - BaseLayerConfig, base layers objects, **required**
- `width` - string, width for basemaps layers container, **default: '150px'**
- `height` - string, height for basemaps layers container, **default: '100px'**

Layer Configuration
- `name` - string, name to visualize layer in container, **required**
- `tiles` - string[], urls of basemap layer, **required**
- `visibility` - 'visible' | 'none', visible to load layer by default else none, **required**
- `attribution` - string, attribution for basemap layer, **optional**
- `minZoom` - number, min zoom to display the grid, **default: 0**
- `maxZoom` - number, max zoom to display the grid , **default: 20**

