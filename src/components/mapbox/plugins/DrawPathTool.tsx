import React, { useContext, useEffect } from 'react';
import MapBoxContext from "@/components/mapbox/context/MapBoxContext";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { FeatureCollection } from "geojson";
import { debounce } from 'lodash'
import { genPointFeature } from "@/components/mapbox/utils/utils";
import { GeoJSONSource } from "mapbox-gl";


type eventType = 'draw.create'|'draw.update'|'draw.delete'

export interface DrawPathToolProps {
  options?: MapboxDraw.MapboxDrawOptions;
  onChange?: (et: eventType, selected: FeatureCollection, all: FeatureCollection) => void;
  onReady?: (draw: MapboxDraw) => void;
  delta?: number; // distance of points less then delta, will draw as the same point
}

/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function DrawPathTool({ options, onChange, onReady }: DrawPathToolProps) {
  const { map, styleLoaded } = useContext(MapBoxContext)

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
      console.log('endMouseMove', lng, lat);
      const source = map.getSource('road-point') as GeoJSONSource
      source.setData(genPointFeature(lng, lat))
    }, 150)

    // when mouse move, detect the cloest point in delta distance
    const mousemove = function (event) {
      // console.log('mousemove', event)
      const point = event.lngLat
      mouseMoveDebounce(event.lngLat.lng, event.lngLat.lat)
    }
    map.on('mousemove', mousemove)

    const mouseclick = function (event) {
      // console.log('click', event)
    }
    map.on('click', mouseclick)

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
    }
  }, [map, styleLoaded])

  return null
}
