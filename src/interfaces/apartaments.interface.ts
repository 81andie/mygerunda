export interface apartmentsGeoJson {
  type: 'FeatureCollection';
  features: apartmentsFeature[];
}
export interface apartmentsFeature {
  type: 'Feature';
  properties: apartmentsProperties;
  geometry: apartmentsGeometry;
}

export interface apartmentsProperties {
  id: "number",
  name: "string",
  url: "string",
  img: "string",
  direccio: "string",
  telf: "string",
  email: "string",
  estrelles: "string"
}


export interface apartmentsGeometry {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}
