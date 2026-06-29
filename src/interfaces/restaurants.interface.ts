export interface restaurantsGeoJson {
  type: 'FeatureCollection';
  features: restaurantsFeature[];
}
export interface restaurantsFeature {
  type: 'Feature';
  properties: restaurantsProperties;
  geometry: restaurantsGeometry;
}

export interface restaurantsProperties {
  id: "number",
  name: "string",
  url: "string",
  img: "string",
  direccio: "string",
  telf: "string",
  email: "string",

}


export interface restaurantsGeometry {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}
