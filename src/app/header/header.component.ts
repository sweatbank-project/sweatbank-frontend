import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { faArrowRightFromBracket, faComments, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import {Router, RouterLink} from '@angular/router';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule, NgClass } from "@angular/common";

// Assuming Bootstrap types are available (as an example)
interface BootstrapCollapse {
  show(): void;
  hide(): void;
}

declare var bootstrap: {
  Collapse: new (element: HTMLElement, options?: any) => BootstrapCollapse
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule, NgClass, CommonModule, RouterLink],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('menu') menuElement: ElementRef<HTMLElement> | undefined;
  menuActive: boolean = false;
  userName = 'Name';
  userSurname = 'Surname';
  faArrowRightFromBracket = faArrowRightFromBracket;
  faComments = faComments;
  faBell = faBell;
  faBars = faBars;
  private bsCollapse: BootstrapCollapse | null = null;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    if (this.menuElement) {
      this.bsCollapse = new bootstrap.Collapse(this.menuElement.nativeElement, {
        toggle: false
      });
    }
  }

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
    if (this.menuActive) {
      this.bsCollapse?.show();
    } else {
      this.bsCollapse?.hide();
    }
  }

  navigateAndScroll(): void {
    if (this.router.url !== '/') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.scrollToBottom();
        this.toggleMenu();
      });
    } else {
      this.scrollToBottom();
      this.toggleMenu();
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
}
