import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Inicio } from './components/inicio/inicio';

import { Footer } from "./components/footer/footer";
import { Navbar } from "./components/navbar/navbar";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit{
  protected readonly title = signal('myGerunda');
   ngOnInit(): void {
    initFlowbite();
  }
}
