import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Carrussel } from "../carrussel/carrussel";
import { Hero } from "../hero/hero";
import { BentoGrid } from "../bento-grid/bento-grid";
import { Cards } from "../cards/cards";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-inicio',
  imports: [Navbar, Carrussel, Hero, BentoGrid, Cards, Footer],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

}
