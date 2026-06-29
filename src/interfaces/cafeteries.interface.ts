export interface cafeteriesGeoJson {
  type: 'FeatureCollection';
  features: cafeteriesFeature[];
}
export interface cafeteriesFeature {
  type: 'Feature';
  properties: cafeteriesProperties;
  geometry: cafeteriesGeometry;
}

export interface cafeteriesProperties {
  id: "number",
  name: "string",
  url: "string",
  img: "string",
  direccio: "string",
  telf: "string",
  email: "string",
 
}


export interface cafeteriesGeometry {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}
