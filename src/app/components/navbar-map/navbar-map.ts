import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';


@Component({
  selector: 'app-navbar-map',
  imports: [RouterModule, NgClass],
  templateUrl: './navbar-map.html',
  styleUrl: './navbar-map.css',
})
export class NavbarMap {

   @Input() activeButton = '';


   @Output() buttonClick = new EventEmitter<string>();

    emitirBoton(boton: string) {
    this.buttonClick.emit(boton);
  }

}
