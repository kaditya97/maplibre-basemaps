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
