export interface PensionsGeoJson {
  type: 'FeatureCollection';
  features: PensionFeature[];
}
export interface PensionFeature {
  type: 'Feature';
  properties: PensionProperties;
  geometry: PensionGeometry;
}

export interface PensionProperties {
  id: "number",
  name: "string",
  url: "string",
  img: "string",
  direccio: "string",
  telf: "string",
  email: "string",
  estrelles: "string"
}

export interface PensionGeometry {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}
