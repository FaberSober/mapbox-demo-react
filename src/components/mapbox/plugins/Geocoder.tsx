import React, { useContext, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapBoxContext from "@/components/mapbox/context/MapBoxContext";
import MapboxGeocoder, { Result } from '@mapbox/mapbox-gl-geocoder';
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"


/**
 * @author xu.pengfei
 * @date 2022/11/22
 */
export default function Geocoder() {
  const {accessToken, map, styleLoaded} = useContext(MapBoxContext)

  useEffect(() => {
    if (!styleLoaded) return;
    if (map === undefined) return;

    /* Given a query in the form "lng, lat" or "lat, lng"
      * returns the matching geographic coordinate(s)
      * as search results in carmen geojson format,
      * https://github.com/mapbox/carmen/blob/master/carmen-geojson.md */
    const coordinatesGeocoder = function (query: string): Result[] {
      // Match anything which looks like
      // decimal degrees coordinate pair.
      const matches = query.match(
        /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
      );
      if (!matches) {
        return [];
      }

      function coordinateFeature(lng, lat) {
        return {
          center: [lng, lat],
          geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          place_name: 'Lat: ' + lat + ' Lng: ' + lng,
          place_type: ['coordinate'],
          properties: {},
          type: 'Feature'
        };
      }

      const coord1 = Number(matches[1]);
      const coord2 = Number(matches[2]);
      const geocodes = [];

      if (coord1 < -90 || coord1 > 90) {
        // must be lng, lat
        geocodes.push(coordinateFeature(coord1, coord2));
      }

      if (coord2 < -90 || coord2 > 90) {
        // must be lat, lng
        geocodes.push(coordinateFeature(coord2, coord1));
      }

      if (geocodes.length === 0) {
        // else could be either lng, lat or lat, lng
        geocodes.push(coordinateFeature(coord1, coord2));
        geocodes.push(coordinateFeature(coord2, coord1));
      }

      return geocodes;
    };

    // Add the control to the map.
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      zoom: 4,
      placeholder: 'Try: -40, 170',
      mapboxgl: mapboxgl,
      reverseGeocode: true,
      localGeocoder: coordinatesGeocoder,
    })
    map.addControl(geocoder);

    return () => { map.removeControl(geocoder) }
  }, [map, styleLoaded])

  return (
    <div></div>
  )
}
