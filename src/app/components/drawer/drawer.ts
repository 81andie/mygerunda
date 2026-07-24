import { CommonModule } from '@angular/common';

import { Component, effect, inject, Inject, AfterViewInit } from '@angular/core';
import { MapStateService } from '../../../services/MapState.service';

import { Drawer, DrawerInterface } from 'flowbite';



@Component({
  selector: 'app-drawer',
  imports: [CommonModule],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
})
export class Drawers {


  mapState = inject(MapStateService)


  private drawer!: DrawerInterface;

  constructor() {
    console.log('DRAWER CREADO');

    effect(() => {

      const place = this.mapState.selectedPlace();
      if (!this.drawer) return;
      // console.log('DRAWER EFFECT', place);

      if (place) {
        this.drawer.show();
      } else {
        this.drawer.hide()
      }
    });
  }

  ngAfterViewInit() {
    const drawerElement = document.getElementById('drawer-swipe');

    console.log('drawerElement', drawerElement);

    if (drawerElement) {
      this.drawer = new Drawer(drawerElement, {
        placement: 'bottom',
        edge: true,
        edgeOffset: 'bottom-[60px]',
        backdrop: false
      });
    }
    if (this.mapState.selectedPlace()) {
      this.drawer.show();
    }

  }

  toggleDrawer() {
    if (this.mapState.selectedPlace()) {
      this.drawer.hide();
      this.mapState.selectedPlace.set(null);
    }
  }



}










