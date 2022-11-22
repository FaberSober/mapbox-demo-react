import React from 'react';
import MapBox from "@/components/mapbox/MapBox";
import mapboxgl from "mapbox-gl";

/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function Point() {
  function handleMapReady(map: mapboxgl.Map) {
    map.addSource('point', {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'Point',
          'coordinates': [-122.483696, 37.833818],
        }
      }
    });

    map.addLayer({
      'id': 'route',
      'type': 'circle',
      'source': 'point',
      'paint': {
        'circle-color': '#F00',
        'circle-radius': 8
      }
    });
  }

  return (
    <div>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <h2>Point</h2>

        <MapBox mapId="map" onReady={handleMapReady} options={{ center: [-122.486052, 37.830348], zoom: 14 }} />
      </div>
    </div>
  )
}
