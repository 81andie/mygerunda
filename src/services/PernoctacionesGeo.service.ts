import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelGeometry, HotelFeature, HotelsGeoJson } from '../interfaces/hotels.interface';
import { PensionsGeoJson } from '../interfaces/pensiones.interface';
import { apartmentsGeoJson } from '../interfaces/apartaments.interface';

@Injectable({ providedIn: 'root' })
export class PernotacionesGeoService {

  constructor(private http: HttpClient) { }

  private geoLocalizeHotels = 'hotels.geojson';
  private geoLocalizePensiones = 'pensiones.geojson';
   private geoLocalizeApartments = 'apartaments.geojson';

  getLocalizationHotels(): Observable<HotelsGeoJson> {
    return this.http.get<HotelsGeoJson>(this.geoLocalizeHotels)
  }


  getLocalizationPensiones(): Observable<PensionsGeoJson> {
    return this.http.get<PensionsGeoJson>(this.geoLocalizePensiones)
  }

  getLocalizationApartments(): Observable<apartmentsGeoJson> {
    return this.http.get<apartmentsGeoJson>(this.geoLocalizeApartments)
  }




}
