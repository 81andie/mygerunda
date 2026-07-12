import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MapFilterService } from '../../../services/map-filter.service';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  private router = inject(Router);
  private mapFilter = inject(MapFilterService);

  goToMap(filter: string) {

    this.mapFilter.setFilter(filter);

    this.router.navigate(['/map']);

  }

}
