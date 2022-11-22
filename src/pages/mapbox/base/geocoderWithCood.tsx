import React from 'react';
import MapBox from "@/components/mapbox/MapBox";
import GeocoderWithCood from "@/components/mapbox/plugins/GeocoderWithCood";

/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function geocoderWithCood() {
  return (
    <div>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <h2>geocoder with coordinates</h2>

        <MapBox mapId="map">
          <GeocoderWithCood />
        </MapBox>

      </div>
    </div>
  )
}
