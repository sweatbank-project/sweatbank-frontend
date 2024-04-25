import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isClosed: boolean = false;

  data= {
    "new": 1,
    "pending": 2,
    "approved": 3,
    "rejected": 4
  }

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }
}
