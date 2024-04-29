import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  private readonly router = inject(Router);

  goToAccount(): void {
    this.router.navigate(["/account"]);
  }

  goToUserLeases(): void {
    this.router.navigate(["/leases"]);
  }

  goToCreateLease(): void {
    this.router.navigate(["/lease/create"]);
  }
}
