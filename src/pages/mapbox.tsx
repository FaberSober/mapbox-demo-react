import { Outlet } from 'react-router-dom'
import { Suspense } from "react";

export default function Mapbox() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </div>
  )
}
