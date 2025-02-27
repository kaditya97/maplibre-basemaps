import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import BasemapControl from "maplibre-basemaps";

const Map = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: { version: 8, glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf', sources: {}, layers: [] },
            center: [85.324, 27.717],
            zoom: 7,
        });

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
        const basemapControl = new BasemapControl({ basemaps: baseLayers, initialBasemap: "osmHot" });
        map.on("load", () => {
            map.addControl(basemapControl, 'top-right');
        })

        return () => map.remove(); // Cleanup map instance on unmount
    }, []);

    return <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />;
};

export default Map;
