import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userName: string = "Andriuha";
  userSurname: string = "Petrauskas";
  dropdownStates: { [key: string]: boolean } = {
    dropdown1: false,
    dropdown2: false
  };

  constructor(private router: Router) {}

  toggleDropdown(dropdownName: string) {
    this.dropdownStates[dropdownName] = !this.dropdownStates[dropdownName];
  }

  logout() {

  }

}
