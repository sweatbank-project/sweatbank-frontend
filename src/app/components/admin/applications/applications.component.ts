import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {DataTablesModule} from 'angular-datatables';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    NgForOf
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent {
  isClosed: boolean = false;
  dropdownStates: { [key: string]: boolean } = {
    dropdown1: false,
  };

  data = [
    {
      status: 'Approved',
      id: 'SW0001',
      date: 'March 8, 2024',
      personalId: '981732768126',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890'
    },
    {
      status: 'Pending',
      id: 'SW0002',
      date: 'March 9, 2024',
      personalId: '981732768127',
      fullName: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '+0987654321'
    }
  ];

  //data: any;

  constructor(private http: HttpClient, private router: Router) {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data => {
      //this.data = data;
      setTimeout(() => {
        $('#applications').DataTable({
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          lengthMenu: [10, 25, 50],
        });
      }, 1);
    }, error => console.error(error));
  }


  openEmailForm(email: string) {
    this.router.navigate(['/admin/inbox', { email: email }]);
  }

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }

  toggleDropdown(dropdownName: string) {
    this.dropdownStates[dropdownName] = !this.dropdownStates[dropdownName];
  }
}
