import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import Chart from 'chart.js/auto';

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
  chart: any = [];

  data= {
    "new": 1,
    "pending": 2,
    "approved": 3,
    "rejected": 4
  }

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'New Applications',
            data: [12, 19, 3, 5, 2, 3, 20],
            borderWidth: 1,
          },
          {
            label: 'Admin Actions',
            data: [6, 10, 5, 8, 1, 2, 10],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }
}
