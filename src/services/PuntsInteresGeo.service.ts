import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pInteresGeoJson } from '../interfaces/puntsInteres.interface';


@Injectable({ providedIn: 'root' })
export class PuntsInteresGeoService {

    constructor(private http: HttpClient) { }

      private geoLocalizePuntsInteres = 'puntsInteres.geojson';

       getLocalizationPuntsInteres(): Observable<pInteresGeoJson> {
          return this.http.get<pInteresGeoJson>(this.geoLocalizePuntsInteres)
        }
}
