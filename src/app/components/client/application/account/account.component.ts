import { Component, OnInit, inject } from '@angular/core';
import { AccountData } from '../data';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  accountData: AccountData = {
    username: 'None',
    first_name: 'None',
    last_name: 'None',
    address: 'None',
    phone_number: 'None',
    birth_date: 'None'
  };

  constructor(private titleService:Title) {
    this.titleService.setTitle("Sweatbank My Account");
  }

  ngOnInit(): void {
    this.accountData = {
      username: this.authService.getUserData("username") || '',
      first_name: this.authService.getUserData("firstName") || '',
      last_name: this.authService.getUserData("lastName") || '',
      address: this.authService.getUserData("address") || '',
      phone_number: this.authService.getUserData("phoneNumber") || '',
      birth_date: this.authService.getUserData("birthDate") || '',
    };
  }

  goBackToHome(): void {
    this.router.navigate(['/home']);
  }
}
