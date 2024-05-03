import { NgClass } from '@angular/common';
import {Component, inject} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterOutlet, NgClass, RouterLink],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  authService = inject(AuthService);
  username = this.authService.getUserName();

  dropdownStates: { [key: string]: boolean } = {
    dropdown1: false,
    dropdown2: false
  };

  toggleDropdown(dropdownName: string) {
    this.dropdownStates[dropdownName] = !this.dropdownStates[dropdownName];

    if(dropdownName == 'dropdown1') {
      const element = document.getElementById('navbarNav') as HTMLInputElement;
  
      const isShowClassPresent = element.classList.contains('show');
      if(isShowClassPresent) {
        element.classList.remove('show');
      } else {
        element.classList.add('show');
      }
    }
  }

  logout() {
    this.authService.logout();
  }
}
