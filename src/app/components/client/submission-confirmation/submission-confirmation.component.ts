import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-submission-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './submission-confirmation.component.html',
  styleUrl: './submission-confirmation.component.scss',
})
export class SubmissionConfirmationComponent implements OnInit {
  countdown = 5;
  interval: NodeJS.Timeout | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(this.interval);
        this.router.navigate(['home']);
      }
    }, 1000);
  }
  redirectToNow(): void {
    clearInterval(this.interval);
    this.router.navigate(['home']);
  }
}
