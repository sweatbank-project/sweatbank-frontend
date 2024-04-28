import { NgClass } from '@angular/common';
import {Component, inject} from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import {authInterceptor} from "../../core/auth.interceptor";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, NgClass, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  authService = inject(AuthService);
  role = this.authService.getRole();
  username = this.authService.getUserName();
  constructor(private router: Router) {
    console.log(this.authService.getToken())
  }

  logout() {
    this.authService.logout()
  }

  protected readonly authInterceptor = authInterceptor;


}
