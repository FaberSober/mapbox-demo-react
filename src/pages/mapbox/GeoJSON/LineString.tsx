import React, { useState } from 'react';
import MapBox from "@/components/mapbox/MapBox";
import mapboxgl from "mapbox-gl";

/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function LineString() {
  const [map, setMap] = useState<mapboxgl.Map>()

  return (
    <div>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <h2>LineString</h2>

        <MapBox mapId="map" onReady={(map) => setMap(map)} />
      </div>
    </div>
  )
}
