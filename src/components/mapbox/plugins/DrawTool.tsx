import React, { useContext, useEffect } from 'react';
import MapBoxContext from "@/components/mapbox/context/MapBoxContext";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { FeatureCollection } from "geojson";


type eventType = 'draw.create'|'draw.update'|'draw.delete'

export interface DrawToolProps {
  options?: MapboxDraw.MapboxDrawOptions;
  onChange?: (et: eventType, selected: FeatureCollection, all: FeatureCollection) => void;
}

/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function DrawTool({ options, onChange }: DrawToolProps) {
  const { map, styleLoaded } = useContext(MapBoxContext)

  useEffect(() => {
    if (map === undefined || !styleLoaded) return

    // Add the control to the map.
    const draw = new MapboxDraw({
      displayControlsDefault: true,
      controls: {
        point: true,
        line_string: true,
        polygon: true,
        trash: true
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
      console.log('updateArea', e, selected, data)
      if (onChange) {
        onChange(e.type, selected, data)
      }
    }

    return () => { map.removeControl(draw) }
  }, [map, styleLoaded])

  return (
    <div></div>
  )
}
