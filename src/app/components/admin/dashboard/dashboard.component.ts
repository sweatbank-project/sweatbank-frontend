import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  chart: any = [];
  cardData = {
    amountOfNewLeases: 0,
    amountOfPendingLeases: 0,
    amountOfApprovedLeases: 0,
    amountOfRejectedLeases: 0,
  };
  canvas = {
    labels: [] as string[],
    data: [] as number[],
  };

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faSpinner = faSpinner;
  isLoading = false;

  constructor(private http: HttpClient, private titleService: Title) {}

  // fetchData(): void {
  //   this.http.get<any>(environment.apiUrl + 'admin/dashboard').subscribe(
  //     (data) => {
  //       this.cardData = { ...data };
  //       this.canvas.labels = data.datesWithCounts.map(
  //         (entry: any) => entry.leaseCreationDate
  //       );
  //       this.canvas.data = data.datesWithCounts.map(
  //         (entry: any) => entry.countOfLeases
  //       );
  //       this.isLoading = false;
  //       this.renderChart();
  //     },
  //     (error) => console.error(error)
  //   );
  // }

  // ngOnInit() {
  //   this.titleService.setTitle('Sweatbank Admin Dashboard');
  //   this.isLoading = true;
  //   this.fetchData();
  // }

  renderChart(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.canvas.labels,
        datasets: [
          {
            label: 'New Applications',
            data: this.canvas.data,
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
    const obligationsChange = document.getElementById(
      'canvas'
    ) as HTMLInputElement;
    obligationsChange.style.backgroundColor = 'white';
  }
}
