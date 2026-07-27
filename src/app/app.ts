import { Component, signal, OnInit } from '@angular/core';
import { NavigationEnd, RouterOutlet,Router} from '@angular/router';
import { initFlowbite } from 'flowbite';
import { filter } from 'rxjs';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit{
  protected readonly title = signal('myGerunda');

   constructor(private router: Router) {}


   ngOnInit(): void {
    initFlowbite();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        initFlowbite();
      });
  }
  }

