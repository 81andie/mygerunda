import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Navbar } from "./components/navbar/navbar";
import { Carrussel } from "./components/carrussel/carrussel";
import { Hero } from "./components/hero/hero";

import { BentoGrid } from "./components/bento-grid/bento-grid";
import { Cards } from "./components/cards/cards";
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Carrussel, Hero, BentoGrid, Cards, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit{
  protected readonly title = signal('myGerunda');
   ngOnInit(): void {
    initFlowbite();
  }
}
