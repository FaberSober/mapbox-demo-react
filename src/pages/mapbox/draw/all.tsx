import React, { useEffect, useState } from 'react';
import MapBox from "@/components/mapbox/MapBox";
import DrawTool from "@/components/mapbox/plugins/DrawTool";
import { FeatureCollection } from "geojson";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import ReactJson from 'react-json-view'
import GeocoderWithCood from "@/components/mapbox/plugins/GeocoderWithCood";
import CursorPointShow from "@/components/mapbox/plugins/CursorPointShow";


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
        setAll(feature)
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
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <div style={{ flex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h2>draw all</h2>

        <div style={{ flex: 1 }}>
          <MapBox
            mapId="map"
            options={{
              style: 'mapbox://styles/mapbox/satellite-v9',
              projection: 'naturalEarth', // starting projection
              center: [94.921150,42.084420],
              zoom: 16,
            }}
          >
            <GeocoderWithCood />
            <DrawTool
              onReady={handleReady}
              onChange={handleChange}
            />
            <CursorPointShow />
          </MapBox>
        </div>
      </div>

      <div style={{ flex: 1, height: '100%', overflow: 'auto' }}>
        <ReactJson src={all} style={{ height: '100%' }} />
      </div>
    </div>
  )
}
