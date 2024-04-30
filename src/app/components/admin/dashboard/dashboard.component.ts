import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { environment } from '../../../../environments/environment';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  chart: any = [];
  cardData = {
    'newApplications': 0,
    'pendingApplications': 0,
    'approvedApplications': 0,
    'rejectedApplications': 0
  }
  canvas = {
    labels: [] as string[],
    data: [] as number[]
  }

  constructor(private http: HttpClient, private titleService:Title) {
    this.titleService.setTitle("Sweatbank Admin Dashboard");
    
    const data= {
      "newApplications": 1,
      "pendingApplications": 2,
      "approvedApplications": 3,
      "rejectedApplications": 4,
      "canvas": [
          {
              "date": "2024-04-24",
              "count": 1
          },
          {
              "date": "2024-04-25",
              "count": 2
          },
          {
              "date": "2024-04-26",
              "count": 3
          },
          {
              "date": "2024-04-27",
              "count": 4
          },
          {
              "date": "2024-04-28",
              "count": 5
          },
          {
              "date": "2024-04-29",
              "count": 6
          },
          {
              "date": "2024-04-30",
              "count": 7
          }
      ]
    }

    // this.http.get(environment.apiUrl + '').subscribe(
    //   (data) => {
            this.cardData = { ...data };
            this.canvas.labels = data.canvas.map(entry => entry.date);
            this.canvas.data = data.canvas.map(entry => entry.count);
    //   },
    //   (error) => console.log(error)
    // );
  }


  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.canvas.labels,
        datasets: [
          {
            label: 'New Applications',
            data: this.canvas.data,
            borderWidth: 1,
          }
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
}
