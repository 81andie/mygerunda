import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Navbar } from "./components/navbar/navbar";
import { Carrussel } from "./components/carrussel/carrussel";
import { Hero } from "./components/hero/hero";
import { Cards } from "./components/cards/cards";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Carrussel, Hero, Cards],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit{
  protected readonly title = signal('myGerunda');
   ngOnInit(): void {
    initFlowbite();
  }
}
