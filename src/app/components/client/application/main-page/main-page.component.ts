import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  private readonly router = inject(Router);

  authService = inject(AuthService);
  firstName = this.authService.getUserData('firstName');

  constructor(private titleService:Title) {
    this.titleService.setTitle("Sweatbank Main");
  }

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
