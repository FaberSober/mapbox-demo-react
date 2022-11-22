import React from 'react';
import MapBox from "@/components/mapbox/MapBox";

/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function streets() {
  return (
    <div>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <h2>streets</h2>

        <MapBox mapId="map" />
      </div>
    </div>
  )
}
