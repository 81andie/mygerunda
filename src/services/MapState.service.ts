import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PlaceInfo {
  name: string;
  image: string;
  direccio:string;
  telf: string;
  url: string;
  email:string
}

@Injectable({ providedIn: 'root' })

export class MapStateService {

 selectedPlace = signal<PlaceInfo | null>(null);
 //selectedCategory = signal<string | null>(null);





}
