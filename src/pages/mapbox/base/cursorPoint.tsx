import React from 'react';
import MapBox from "@/components/mapbox/MapBox";
import CursorPointShow from "@/components/mapbox/plugins/CursorPointShow";

/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function geocoder() {
  return (
    <div>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <h2>CursorPointShow</h2>

        <div id="map" style={{ width: '100%', height: 600, overflow: 'hidden' }} />

        <MapBox mapId="map">
          <CursorPointShow />
        </MapBox>

      </div>
    </div>
  )
}
