import { LayerSpecification, SourceSpecification, Map } from 'maplibre-gl';

type Visibility = 'visible' | 'none';

export interface BaseLayerConfig {
    name: string;
    tiles: Array<string>;
    visibility: Visibility;
    attribution?: string;
    minZoom?: number;
    maxZoom?: number;
  }

export interface BasemapsConfig {
    basemaps: { [key: string]: BaseLayerConfig };
    width?: string;
    height?: string;
  }

export class BasemapControl {
    basemaps: { [key: string]: BaseLayerConfig };
    config: BasemapsConfig;
    _container: HTMLElement;
    constructor(config: BasemapsConfig) {
        this.basemaps = config.basemaps ?? {};
        this.config = config;
        this._container = document.createElement('div');
    }

    onAdd(map: Map): HTMLElement { 
        const div = this._container;
        div.className = 'maplibregl-ctrl maplibregl-ctrl-group maplibre-ctrl-basemap';
        div.innerHTML = `<button>
            <svg fill="#000000" height="18" width="18" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 421.59 421.59" xml:space="preserve">
            <g>
                <g>
                    <path d="M400.491,291.098l-58.865-36.976l58.864-36.971c2.185-1.372,3.511-3.771,3.511-6.351s-1.326-4.979-3.511-6.352
                        l-58.865-36.977l58.862-36.973c2.185-1.373,3.511-3.771,3.511-6.351s-1.326-4.979-3.511-6.351L214.783,1.149
                        c-2.438-1.532-5.54-1.532-7.979,0L21.1,117.796c-2.185,1.373-3.511,3.771-3.511,6.351c0,2.58,1.326,4.979,3.511,6.351
                        l58.861,36.972l-58.859,36.978c-2.185,1.373-3.51,3.771-3.51,6.351c0,2.58,1.326,4.979,3.511,6.351l58.859,36.97l-58.859,36.979
                        c-2.185,1.372-3.51,3.771-3.51,6.351c0,2.58,1.326,4.979,3.511,6.351l185.7,116.64c1.22,0.766,2.604,1.149,3.989,1.149
                        s2.77-0.383,3.989-1.149L400.491,303.8c2.185-1.372,3.511-3.771,3.511-6.351C404.002,294.869,402.676,292.47,400.491,291.098z
                        M39.189,124.147l171.605-107.79l171.604,107.79l-171.604,107.79L39.189,124.147z M39.191,210.798l54.869-34.471l112.744,70.818
                        c1.219,0.766,2.604,1.149,3.989,1.149c1.385,0,2.77-0.383,3.989-1.149l112.742-70.817l54.875,34.47L210.792,318.582
                        L39.191,210.798z M210.792,405.232L39.191,297.448l54.87-34.472l112.742,70.814c1.22,0.766,2.604,1.149,3.989,1.149
                        s2.77-0.383,3.989-1.149l112.744-70.812l54.876,34.47L210.792,405.232z"/>
                </g>
            </g>
            </svg>
        </button>`;
        const radioContainer = document.createElement('div');
        radioContainer.style.width = this.config.width ?? '150px';
        radioContainer.style.height = this.config.height ?? '100px';
        radioContainer.style.maxWidth = '250px';
        radioContainer.style.maxHeight = '250px';
        radioContainer.style.display = 'none';
        radioContainer.style.position = 'absolute';
        radioContainer.style.top = '0';
        radioContainer.style.left = '0';
        radioContainer.style.backgroundColor = 'white';
        radioContainer.style.border = '2px solid #ccc';
        radioContainer.style.borderRadius = '5px';
        radioContainer.style.zIndex = '100';
        radioContainer.style.flexDirection = 'column';
        radioContainer.style.padding = '2px 0px';
        radioContainer.style.overflowY = 'auto';
        radioContainer.style.overflowX = 'hidden';

        let previouslayer: string = '';

        const handleChange = (event: any) => {
            map.setLayoutProperty(previouslayer, 'visibility', 'none');
            map.setLayoutProperty(event.target.value, 'visibility', 'visible');
            previouslayer = event.target.value;
        }

        Object.entries(this.basemaps).map(([key, value]) => {
            const radioOptions = document.createElement('div');
            radioOptions.style.display = 'flex';
            radioOptions.style.alignItems = 'center';
            radioOptions.style.padding = '2px 5px';
            radioOptions.style.cursor = 'pointer';
            radioOptions.onmouseenter = () => {
                radioOptions.style.backgroundColor = '#eee';
            }
            radioOptions.onmouseleave = () => {
                radioOptions.style.backgroundColor = 'white';
            }
            const radio = document.createElement('input');
            radio.style.cursor = 'pointer';
            radio.style.margin = '0px';
            radio.type = 'radio';
            radio.id = `basemap-${key}`;
            radio.name = 'options';
            radio.value = key;
            if (value.visibility === 'visible') {
                previouslayer = key;
                radio.checked = true;
            }
            radio.addEventListener('change', handleChange)
            const label = document.createElement('label');
            label.style.padding = '0px 5px';
            label.style.cursor = 'pointer';
            label.style.display = 'inline-block';
            label.style.width = 'calc(100% - 13px)';
            label.htmlFor = `basemap-${key}`;
            label.textContent = value.name;
            radioOptions.appendChild(radio);
            radioOptions.appendChild(label);
            radioContainer.appendChild(radioOptions);
            div.appendChild(radioContainer);
        });

        div.onmouseenter = () => {
            const basemapControl = document.getElementsByClassName('maplibre-ctrl-basemap')[0];
            const basemaCtrlPosition = basemapControl.getBoundingClientRect();
            const ctrlTop = basemaCtrlPosition.top;
            const ctrlLeft = basemaCtrlPosition.left;

            const mapContainer = map.getCanvas().getBoundingClientRect();
            const mapHeight = mapContainer.height;
            const mapWidth = mapContainer.width;

            radioContainer.style.display = 'flex';

            const radioContainerPosition = radioContainer.getBoundingClientRect();
            const radioHeight = radioContainerPosition.height;
            const radioWidth = radioContainerPosition.width;
            
            if ((ctrlTop + radioHeight) > mapHeight) {
                radioContainer.style.marginTop = `-${radioHeight - basemaCtrlPosition.height}px`;
            } else {
                radioContainer.style.marginTop = '0px';
            }
            if ((ctrlLeft + radioWidth) > mapWidth) {
                radioContainer.style.marginLeft = `-${radioWidth}px`;
            } else {
                radioContainer.style.marginLeft = `${basemaCtrlPosition.width}px`;
            }
        }
        div.onmouseleave = () => {
            radioContainer.style.display = 'none';
        }

        Object.entries(this.basemaps).map(([key, value]) => {
            const source: SourceSpecification = {
                type: 'raster',
                tiles: value.tiles,
                tileSize: 256,
                minzoom: value.minZoom ?? 0,
                maxzoom: value.maxZoom ?? 18,
                attribution: value.attribution ?? '',
            }

            const layer: LayerSpecification = {
                id: key,
                type: 'raster',
                source: key,
                layout: {
                    visibility: value.visibility,
                },
            }
            map.addSource(key, source);
            map.addLayer(layer)

        });

        return div;
    }

    onRemove(map: Map) {
        this._container.parentNode?.removeChild(this._container);
        Object.entries(this.basemaps).map(([key]) => {
            map.removeLayer(key);
            map.removeSource(key);
        });
    }
}
