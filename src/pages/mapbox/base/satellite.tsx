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

        <MapBox
          mapId="map"
          options={{
            style: 'mapbox://styles/mapbox/satellite-v9',
            projection: 'naturalEarth', // starting projection
          }}
        />

      </div>
    </div>
  )
}
