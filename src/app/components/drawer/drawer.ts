import { CommonModule } from '@angular/common';
import { Component,effect, inject, Inject, PLATFORM_ID  } from '@angular/core';
import { MapStateService } from '../../../services/MapState.service';

@Component({
  selector: 'app-drawer',
  imports: [CommonModule],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
})
export class Drawer {

constructor(@Inject(PLATFORM_ID) platformId: Object) {
  effect(() => {
    console.log(this.mapState.selectedPlace());
  });

}

mapState=inject(MapStateService)




}
