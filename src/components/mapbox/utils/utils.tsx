import { feature, geometry } from "@turf/turf";

export function genPointFeature(lng: number, lat: number) {
  const point = geometry('Point', [lng, lat]);
  return feature(point)
}
