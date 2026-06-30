export interface pInteresGeoJson {
  type: 'FeatureCollection';
  features: pInteresFeature[];
}
export interface pInteresFeature {
  type: 'Feature';
  properties: pInteresProperties;
  geometry: pInteresGeometry;
}

export interface pInteresProperties {
  id: "number",
  name: "string",
  url: "string",
  img: "string",
  direccio: "string",
  telf: "string",

}


export interface pInteresGeometry {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}
