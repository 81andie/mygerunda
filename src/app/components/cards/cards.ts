import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapStateService } from '../../../services/MapState.service';

@Component({
  selector: 'app-cards',
  imports: [RouterModule],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards {






  mapStateService = inject(MapStateService);





}
