import React from 'react';
import MapBox from "@/components/mapbox/MapBox";
import mapboxgl from "mapbox-gl";
import DrawTool from "@/components/mapbox/plugins/DrawTool";

/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function polygon() {
  return (
    <div>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <h2>draw pologon</h2>

        <MapBox mapId="map">
          <DrawTool
            options={{
              controls: {
                point: false,
                line_string: false,
              }
            }}
          />
        </MapBox>
      </div>
    </div>
  )
}
