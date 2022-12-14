import React from 'react';
import MapBox from "@/components/mapbox/MapBox";
import Geocoder from "@/components/mapbox/plugins/Geocoder";

/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function geocoderWithCood() {
  return (
    <div>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <h2>geocoder</h2>

        <MapBox mapId="map">
          <Geocoder />
        </MapBox>

      </div>
    </div>
  )
}
