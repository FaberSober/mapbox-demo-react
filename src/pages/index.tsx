import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';


// vite - get .env parameter
// console.log('import.meta.env', import.meta.env)

export default function App() {

  return (
    <div>
      <div>
        <span>Base: </span>
        <Link to="/mapbox/base/streets">streets</Link>
        <Divider type="vertical" />
        <Link to="/mapbox/base/satellite">satellite</Link>
        <Divider type="vertical" />
        <Link to="/mapbox/base/geocoder">geocoder</Link>
        <Divider type="vertical" />
        <Link to="/mapbox/base/geocoderWithCood">geocoderWithCood</Link>
        <Divider type="vertical" />
        <Link to="/mapbox/base/cursorPoint">cursorPoint</Link>
      </div>

      <div>
        <span>GeoJSON: </span>
        <Link to="/mapbox/GeoJSON/Point">Point</Link>
        <Divider type="vertical" />
        <Link to="/mapbox/GeoJSON/Points">Points</Link>
        <Divider type="vertical" />
        <Link to="/mapbox/GeoJSON/LineString">LineString</Link>
      </div>

      <div>
        <span>Draw: </span>
        <Link to="/mapbox/draw/all">all</Link>
        <Divider type="vertical" />
        <Link to="/mapbox/draw/point">point</Link>
        <Divider type="vertical" />
        <Link to="/mapbox/draw/lineString">lineString</Link>
        <Divider type="vertical" />
        <Link to="/mapbox/draw/polygon">polygon</Link>
        <Divider type="vertical" />
      </div>

    </div>
  )
}
