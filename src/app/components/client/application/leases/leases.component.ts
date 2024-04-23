import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../assets/header/header.component';
import { FooterComponent } from '../../assets/footer/footer.component';
import { LeaseData } from '../data';
import { LeaseService } from '../../../../services/lease.service';
import { AuthService } from '../../../../services/auth.service';
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-leases',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FontAwesomeModule
  ],
  templateUrl: './leases.component.html',
  styleUrl: './leases.component.scss'
})
export class LeasesComponent implements OnInit {
  private readonly leaseService = inject(LeaseService);
  private readonly authService = inject(AuthService);

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faSpinner = faSpinner;

  isLoading = false;
  failedFetch = false;

  username: string = '';
  leases: LeaseData[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.failedFetch = false;

    this.username = this.authService.getUserData('username');

    this.leaseService.getUserLeases(this.username).subscribe({
      next: (response) => {
        this.leases = response.body!.leases;
      },
      error: (error) => {
        this.isLoading = false;
        this.failedFetch = true;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
