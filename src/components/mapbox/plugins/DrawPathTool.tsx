import React, { useContext, useEffect, useRef, useState } from 'react';
import MapBoxContext from "@/components/mapbox/context/MapBoxContext";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { Feature, FeatureCollection, LineString } from "geojson";
import { debounce, each, get } from 'lodash'
import { genPointFeature, genLineStringFeature } from "@/components/mapbox/utils/utils";
import { GeoJSONSource, MapEventType, MapMouseEvent } from "mapbox-gl";
import { distance, point } from '@turf/turf'


let minDisFlag: number|undefined; // 鼠标移动，找到小于delta的最近点的距离
let closestPointFlag : [number, number]|undefined; // 鼠标移动，找到小于delta的最近点的坐标

/**
 * 找到路径在delta内距离最近的点
 * @param allLines
 * @param mousePoint
 * @param delta
 */
function findClosestPoint(allLines: Feature[], mousePoint: [number, number], delta: number): {
  minDis: number|undefined,
  closestPoint: [number, number]|undefined
} {
  let minDis = undefined;
  let closestPoint = undefined;

  allLines.map(f => {
    const geom = f.geometry as LineString;
    geom.coordinates.map((coord:any) => {
      const dis = distance(point(mousePoint), point(coord), {units: 'meters'})
      if (dis === 0) return;
      if (dis < delta) {
        if (minDis) {
          if (dis < minDis) {
            minDis = dis;
            closestPoint = coord
          }
        } else {
          minDis = dis;
          closestPoint = coord
        }
      }
    })
  })
  // console.log(minDis, closestPoint)
  return { minDis, closestPoint }
}

type eventType = 'draw.create'|'draw.update'|'draw.delete'

export interface DrawPathToolProps {
  options?: MapboxDraw.MapboxDrawOptions;
  onChange?: (et: eventType, selected: FeatureCollection, all: FeatureCollection) => void;
  onReady?: (draw: MapboxDraw) => void;
  delta?: number; // distance of points less then delta, will draw as the same point(unit: meters)
}

/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function DrawPathTool({ options, onChange, onReady, delta = 5 }: DrawPathToolProps) {
  const { map, styleLoaded } = useContext(MapBoxContext)
  const drawRef = useRef<MapboxDraw>()

  useEffect(() => {
    if (map === undefined || !styleLoaded) return

    // Add the control to the map.
    const draw = new MapboxDraw({
      displayControlsDefault: true,
      controls: {
        point: false,
        line_string: true,
        polygon: false,
        trash: true,
        combine_features: false,
        uncombine_features: false,
      },
      ...options,
    });
    drawRef.current = draw;
    map.addControl(draw);

    map.on('draw.create', updateArea);
    map.on('draw.update', updateArea);
    map.on('draw.delete', updateArea);

    function updateArea(e) {
      const selected = draw.getSelected();
      const data = draw.getAll();
      // console.log('updateArea', e, selected, data)
      if (onChange) {
        onChange(e.type, selected, data)
      }
    }

    // add point show layer
    map.addSource('road-point', {
      'type': 'geojson',
      'data': genPointFeature(0, 0)
    });

    map.addLayer({
      'id': 'road-point-layer',
      'type': 'circle',
      'source': 'road-point',
      'paint': {
        'circle-color': '#F00',
        'circle-radius': 15,
        'circle-opacity': 0.3,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#F00'
      }
    });

    // debounce update point circle
    const mouseMoveDebounce:any = debounce((lng, lat) => {
      console.log('endMouseMove', draw.getAll(), draw.getSelectedIds());

      let allLines = draw.getAll().features;
      const selectedIds = draw.getSelectedIds()
      if (selectedIds.length > 0) {
        allLines = allLines.filter(l => selectedIds.indexOf(l.id as string) === -1)
      }
      const result = findClosestPoint(allLines, [lng, lat], delta || 5)
      minDisFlag = result.minDis;
      closestPointFlag = result.closestPoint;

      const source = map.getSource('road-point') as GeoJSONSource
      if (closestPointFlag) {
        source.setData(genPointFeature(closestPointFlag[0], closestPointFlag[1]))
      } else {
        source.setData(genPointFeature(0, 0))
      }
    }, 50)

    // when mouse move, detect the cloest point in delta distance
    const mousemove = function (event) {
      // console.log('mousemove', event)
      mouseMoveDebounce(event.lngLat.lng, event.lngLat.lat)
    }
    map.on('mousemove', mousemove)

    const mouseclick = function (event: MapMouseEvent) {
      // console.log('click', event, closestPointFlag, draw.getMode())
      if (closestPointFlag) {
        // 判断draw的当前行为
        switch (draw.getMode()) {
          case "static":
          case "simple_select":
          {
            const featureIds = draw.add({
              type: 'LineString',
              coordinates: [
                closestPointFlag,
              ]
            });
            draw.changeMode('draw_line_string', { featureId: featureIds[0], from: closestPointFlag })
          } break;
        }
      }
    }
    map.on('click', mouseclick)

    const mouseup = function (event: MapMouseEvent) {
      console.log('mouseup', event, closestPointFlag, draw.getMode(), draw.getSelectedPoints(), draw.getSelected())
      if (closestPointFlag && draw.getMode() === 'direct_select' && draw.getSelectedPoints().features.length > 0) {
        // 修改移动的点到选中的最近点
        const movePoint = draw.getSelectedPoints().features[0].geometry.coordinates;
        const features = draw.getSelected().features.map((f) => {
          f.geometry.coordinates = f.geometry.coordinates.map(coord => {
            if (coord[0] === movePoint[0] && coord[1] === movePoint[1]) {
              return closestPointFlag;
            }
            return coord;
          })
          draw.add(f)
        })
      }
    }
    map.on('mouseup', mouseup)

    if (onReady) {
      onReady(draw)
    }

    return () => {
      map.removeControl(draw);
      map.removeLayer('road-point-layer')
      map.removeSource('road-point')

      map.off('draw.create', updateArea);
      map.off('draw.update', updateArea);
      map.off('draw.delete', updateArea);

      map.off('mousemove', mousemove);
      map.off('click', mouseclick);
      map.off('mouseup', mouseup)
    }
  }, [map, styleLoaded])

  return null
}
