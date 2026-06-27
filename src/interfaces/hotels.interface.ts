export interface HotelsGeoJson {
  type: 'FeatureCollection';
  features: HotelFeature[];
}
export interface HotelFeature {
  type: 'Feature';
  properties: HotelProperties;
  geometry: HotelGeometry;
}

export interface HotelProperties {
  id: "number",
  name: "string",
  url: "string",
  img: "string",
  direccio: "string",
  telf: "string",
  email: "string",
  estrelles: "string"
}


export interface HotelGeometry {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}
