import { CommonModule } from '@angular/common';

import { Component,effect, inject, Inject,afterNextRender} from '@angular/core';
import { MapStateService } from '../../../services/MapState.service';

import { Drawer, DrawerInterface } from 'flowbite';



@Component({
  selector: 'app-drawer',
  imports: [CommonModule],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
})
export class Drawers  {


mapState=inject(MapStateService)


 private drawer!: DrawerInterface;

  constructor() {

    afterNextRender(() => {

      const drawerElement = document.getElementById('drawer-swipe');

      if (drawerElement) {
        this.drawer = new Drawer(drawerElement, {
          placement: 'bottom',
          edge: true,
          edgeOffset: 'bottom-[60px]'
        });
      }

      effect(() => {

        const place = this.mapState.selectedPlace();

        if (place) {
          this.drawer.show();
        }

      });

    });

  }



}






