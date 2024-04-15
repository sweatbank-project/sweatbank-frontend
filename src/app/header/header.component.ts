import {ChangeDetectorRef, Component, HostListener} from '@angular/core';
import { faArrowRightFromBracket, faComments, faBell, faLanguage, faBars } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule, NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, NgClass, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuActive: boolean = false;

  constructor(private router: Router) {}

  // navigateToBottom(): void {
  //   this.router.navigate(['/'], { fragment: 'bottom' });
  // }

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }
  userName = 'Name';
  userSurname = 'Surname';
  faArrowRightFromBracket = faArrowRightFromBracket;
  faComments = faComments;
  faBell = faBell;
  faLanguage = faLanguage;
  faBars = faBars;

  logout() {

  }
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.menuActive) {
      this.toggleMenu();
    }
  }

  changeLanguage() {}
}
