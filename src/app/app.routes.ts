import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { MapComponent } from './components/map/map';

export const routes: Routes = [

  { path: 'inicio', component: Inicio },
  { path: 'map', component: MapComponent}
];
