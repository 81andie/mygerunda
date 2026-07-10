import { CommonModule } from '@angular/common';

import { Component,effect, inject, Inject,AfterViewInit} from '@angular/core';
import { MapStateService } from '../../../services/MapState.service';



@Component({
  selector: 'app-drawer',
  imports: [CommonModule],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
})
export class Drawers  {


mapState=inject(MapStateService)






}






