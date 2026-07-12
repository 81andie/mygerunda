import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { MapStateService } from '../../../services/MapState.service';
import { MapFilterService } from '../../../services/map-filter.service';

@Component({
  selector: 'app-cards',
  imports: [RouterModule],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards {

 private router = inject(Router);
 private mapFilter = inject(MapFilterService);

  goToMap(filter: string) {

    this.mapFilter.setFilter(filter);

    this.router.navigate(['/map']);

  }








}
