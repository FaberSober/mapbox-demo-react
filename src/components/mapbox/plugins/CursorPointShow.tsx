import React, {CSSProperties, useContext, useEffect, useState} from 'react';
import MapBoxContext from "@/components/mapbox/context/MapBoxContext";
import { handleClipboard } from "@/utils/utils";


export interface CursorPointShowProps {
  clickCopy?: boolean; // click to copy the coordinates
  style?: CSSProperties;
}

/**
 * 鼠标悬浮经纬度展示
 * @author xu.pengfei
 * @date 2021/12/30 15:39
 */
export default function CursorPointShow({ clickCopy, style }: CursorPointShowProps) {
  const { map, styleLoaded } = useContext(MapBoxContext)

  const [data, setData] = useState<string>('')

  useEffect(() => {
    if (map === undefined || !styleLoaded) return

    // 缩放等级变更
    map.on('mousemove', function (event) {
      console.log('mousemove', event)
      setData(`${event.lngLat.lng}, ${event.lngLat.lat}`)
    })
    map.on('click', function (event) {
      if (clickCopy) {
        handleClipboard(`${event.lngLat.lng},${event.lngLat.lat}`)
      }
    })
  }, [styleLoaded])

  return (
    <div style={{ position: 'absolute', left: 12, bottom: 30, color: '#FFF', backgroundColor: '#00000033', ...style }}>
      坐标：{data}
    </div>
  )
}
