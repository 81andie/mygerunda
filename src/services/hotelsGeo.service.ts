import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelGeometry, HotelFeature, HotelsGeoJson } from '../interfaces/hotels.interface';

@Injectable({ providedIn: 'root' })
export class HotelsGeoService {

  constructor(private http: HttpClient) { }

  private geoLocalize = 'hotels.geojson';


    getLocalization(): Observable<HotelsGeoJson> {
    return this.http.get<HotelsGeoJson>(this.geoLocalize)
  }



}
