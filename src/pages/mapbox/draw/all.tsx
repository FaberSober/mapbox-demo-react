import React, { useEffect, useState } from 'react';
import MapBox from "@/components/mapbox/MapBox";
import DrawTool from "@/components/mapbox/plugins/DrawTool";
import { FeatureCollection } from "geojson";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function all() {
  const [all, setAll] = useState<FeatureCollection>()
  const [draw, setDraw] = useState<MapboxDraw>()

  function handleReady(d: MapboxDraw) {
    setDraw(d)

    // init from localstorage
    try {
      const store = localStorage.getItem('draw.all')
      if (store) {
        const feature =JSON.parse(store)
        const featureIds = d.add(feature);
        console.log(featureIds)
      }
    } catch (e) {
      console.error(e)
    }
  }

  function handleChange(et, sel, all) {
    setAll(all)
    localStorage.setItem('draw.all', JSON.stringify(all))
  }

  return (
    <div>
      <div style={{width: '100%', height: '100%', position: 'relative'}}>
        <h2>draw all</h2>

        <MapBox mapId="map">
          <DrawTool
            onReady={handleReady}
            onChange={handleChange}
          />
        </MapBox>
      </div>
    </div>
  )
}
