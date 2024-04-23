import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../assets/header/header.component';
import { FooterComponent } from '../../assets/footer/footer.component';
import { AccountData } from '../data';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  authService = inject(AuthService);

  accountData: AccountData = {
    username: 'None',
    first_name: 'None',
    last_name: 'None',
    address: 'None',
    phone_number: 'None',
    birth_date: 'None'
  };

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
}
