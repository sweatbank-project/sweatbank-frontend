import { CommonModule, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  RouterOutlet,
  Router,
  RouterLink,
  ActivatedRoute,
  RouterModule,
} from '@angular/router';
import { authInterceptor } from '../../core/auth.interceptor';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, NgClass, RouterLink, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  authService = inject(AuthService);
  role = this.authService.getRole();
  username = this.authService.getUserName();
  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  logout() {
    this.authService.logout();
  }

  routerOutletComponent: object | undefined;
  routerOutletComponentClass: string | undefined;

  onActivate(event: any): void {
    this.routerOutletComponent = event;
    this.routerOutletComponentClass = event.constructor.name;
  }

  protected readonly authInterceptor = authInterceptor;
}
