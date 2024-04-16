import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { faArrowRightFromBracket, faComments, faBell, faLanguage, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule, NgClass } from "@angular/common";
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, NgClass, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuActive: boolean = false;
  userName = 'Name';
  userSurname = 'Surname';
  faArrowRightFromBracket = faArrowRightFromBracket;
  faComments = faComments;
  faBell = faBell;
  faLanguage = faLanguage;
  faBars = faBars;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  navigateAndScroll(): void {
    if (this.router.url !== '/') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.scrollToBottom();
        this.toggleMenu(); // Optionally close the menu
      });
    } else {
      this.scrollToBottom();
      this.toggleMenu(); // Optionally close the menu
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      document.getElementById('page-bottom')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  logout(): void {
    // Log out logic here
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    if (this.menuActive) {
      this.toggleMenu();
    }
  }

  changeLanguage(): void {
    // Language change logic here
  }
}
