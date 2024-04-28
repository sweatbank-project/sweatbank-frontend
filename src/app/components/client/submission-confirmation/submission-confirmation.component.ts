import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-submission-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './submission-confirmation.component.html',
  styleUrl: './submission-confirmation.component.scss'
})
export class SubmissionConfirmationComponent implements OnInit {
  countdown = 5;

  constructor(private router: Router) {}
  ngOnInit(): void {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.router.navigate(['']);
      }
    }, 1000);
  }
  redirectToNow(): void {
    this.router.navigate(['']);
  }
}
