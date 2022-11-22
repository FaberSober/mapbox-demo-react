import React, {createContext} from "react";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_TOKEN

export interface MapBoxContextProps {
  map: mapboxgl.Map; // 地图实例
  styleLoaded: boolean,
}

const MapBoxContext = createContext<MapBoxContextProps>({
  map: undefined!,
  styleLoaded: false,
})

export default MapBoxContext;
