import React, { useEffect, useRef, useState} from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import MapBoxContext, { MapBoxContextProps } from './context/MapBoxContext'

mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_TOKEN


export interface MapBoxProps {
  mapId: string,
  children?: any;
  center?: [number, number];
  mapBoxOptions?: any;
  onReady?: (map: mapboxgl.Map) => void;
}

export default function MapBox({ mapId = 'map', children, center, mapBoxOptions, onReady }: MapBoxProps) {
  const mapRef = useRef<mapboxgl.Map>()
  const [inited, setInited] = useState(false)
  const [styleLoaded, setStyleLoaded] = useState(false)

  useEffect(() => {
    if (inited || styleLoaded) return;
    setInited(true)

    // 加载geoserver图层服务
    const map = new mapboxgl.Map({
      container: mapId, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [0, 0],
      zoom: 0.4, // starting zoom
      // projection: 'naturalEarth', // starting projection
      ...mapBoxOptions,
    });

    mapRef.current = map;

    map.on('style.load', function() {
      console.log('style.load')
      setStyleLoaded(true)
      // map.addLayer(customLayer);
      if (onReady) {
        onReady(map)
      }
    });
  }, [])

  const contextValue: MapBoxContextProps = {
    accessToken: mapboxgl.accessToken,
    map: mapRef.current!,
    styleLoaded,
  }

  return (
    <MapBoxContext.Provider value={contextValue}>
      <div id="map" style={{ width: '100%', height: 600, overflow: 'hidden' }} />

      {mapRef.current && <>{children}</>}
    </MapBoxContext.Provider>
  )
}
