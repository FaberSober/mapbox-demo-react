import React, {createContext} from "react";
import mapboxgl from 'mapbox-gl';

const accessToken = import.meta.env.VITE_APP_MAPBOX_TOKEN
mapboxgl.accessToken = accessToken

export interface MapBoxContextProps {
  accessToken: string;
  map: mapboxgl.Map; // 地图实例
  styleLoaded: boolean,
}

const MapBoxContext = createContext<MapBoxContextProps>({
  accessToken,
  map: undefined!,
  styleLoaded: false,
})

export default MapBoxContext;
