import { Component, OnInit, inject } from '@angular/core';
import { LeaseData } from '../data';
import { LeaseService } from '../../../../services/lease.service';
import { AuthService } from '../../../../services/auth.service';
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-leases',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './leases.component.html',
  styleUrl: './leases.component.scss',
})
export class LeasesComponent implements OnInit {
  private readonly leaseService = inject(LeaseService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faSpinner = faSpinner;

  isLoading = false;
  failedFetch = false;

  username: string = '';
  leases: LeaseData[] = [];

  constructor(private titleService: Title) {
    this.titleService.setTitle('Sweatbank My Leases');
  }

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
      },
    });
  }

  goBackToHome(): void {
    this.router.navigate(['/home']);
  }

  formatEuribor(response: string): string {
    const parts = response.split('_');
    const formattedParts: string[] = [];

    parts.forEach((part, index) => {
      const formattedPart =
        index === 0
          ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          : part.toLowerCase();
      formattedParts.push(formattedPart);
    });

    let formattedResponse = formattedParts.join(' ');

    const lastPart = formattedParts[formattedParts.length - 1];
    if (lastPart === 'month') {
      formattedResponse =
        formattedResponse.substring(0, formattedResponse.length) + 's';
    }

    return formattedResponse;
  }
}
