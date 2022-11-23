import React, { useContext, useEffect } from 'react';
import MapBoxContext from "@/components/mapbox/context/MapBoxContext";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { FeatureCollection } from "geojson";


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

    if (onReady) {
      onReady(draw)
    }

    return () => { map.removeControl(draw) }
  }, [map, styleLoaded])

  return null
}
