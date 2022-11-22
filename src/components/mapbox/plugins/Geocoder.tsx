import React, { useContext, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapBoxContext from "@/components/mapbox/context/MapBoxContext";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"


/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function Geocoder() {
  const {map, styleLoaded} = useContext(MapBoxContext)

  useEffect(() => {
    if (map === undefined || !styleLoaded) return;

    // Add the control to the map.
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    })
    map.addControl(geocoder);

    return () => { map.removeControl(geocoder) }
  }, [map, styleLoaded])

  return (
    <div></div>
  )
}
