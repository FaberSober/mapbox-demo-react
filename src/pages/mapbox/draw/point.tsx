import React from 'react';
import MapBox from "@/components/mapbox/MapBox";
import mapboxgl from "mapbox-gl";
import DrawTool from "@/components/mapbox/plugins/DrawTool";

/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function point() {
  return (
    <div>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <h2>draw point</h2>

        <MapBox mapId="map">
          <DrawTool
            options={{
              controls: {
                line_string: false,
                polygon: false,
              }
            }}
          />
        </MapBox>
      </div>
    </div>
  )
}
