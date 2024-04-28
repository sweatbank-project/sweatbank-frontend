import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterOutlet, NgClass, RouterLink],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  userName: string = "Andriuha";
  userSurname: string = "Petrauskas";
  
  dropdownStates: { [key: string]: boolean } = {
    dropdown1: false,
    dropdown2: false
  };

  toggleDropdown(dropdownName: string) {
    this.dropdownStates[dropdownName] = !this.dropdownStates[dropdownName];
  }

  logout() {}
}
