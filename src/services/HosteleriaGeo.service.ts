import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cafeteriesGeoJson } from '../interfaces/cafeteries.interface';
import { restaurantsGeoJson } from '../interfaces/restaurants.interface';


@Injectable({ providedIn: 'root' })
export class HosteleriaGeoService {

constructor(private http: HttpClient) { }

  private geoLocalizeCafeteries = 'cafeteries.geojson';
  private geoLocalizeRestaurants = 'restaurants.geojson';

    getLocalizationCafeteries(): Observable<cafeteriesGeoJson> {
      return this.http.get<cafeteriesGeoJson>(this.geoLocalizeCafeteries)
    }

    getLocalizationRestaurants(): Observable<restaurantsGeoJson> {
      return this.http.get<restaurantsGeoJson>(this.geoLocalizeRestaurants)
    }

}
