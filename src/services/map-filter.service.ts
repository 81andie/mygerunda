import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapFilterService {

  private filterSubject = new BehaviorSubject<string | null>(null);

  filter$ = this.filterSubject.asObservable();

  setFilter(filter: string) {
    this.filterSubject.next(filter);
  }

}
