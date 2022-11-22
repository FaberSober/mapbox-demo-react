import React from 'react';
import MapBox from "@/components/mapbox/MapBox";

/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function demo01() {
  return (
    <div>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <h2>Base Map</h2>

        <div id="map" style={{ width: '100%', height: 600, overflow: 'hidden' }} />

        <MapBox mapId="map">
        </MapBox>

      </div>
    </div>
  )
}
