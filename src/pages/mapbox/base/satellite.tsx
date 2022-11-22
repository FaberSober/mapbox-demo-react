import React from 'react';
import MapBox from "@/components/mapbox/MapBox";

/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function Satellite() {
  return (
    <div>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <h2>Satellite - 卫星图</h2>

        <div id="map" style={{ width: '100%', height: 600, overflow: 'hidden' }} />

        <MapBox
          mapId="map"
          mapBoxOptions={{
            style: 'mapbox://styles/mapbox/satellite-v9',
            projection: 'naturalEarth', // starting projection
          }}
        >
        </MapBox>

      </div>
    </div>
  )
}
