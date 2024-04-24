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

  openEmailForm(email: string) {
    this.router.navigate(['/admin/inbox', { email: email }]);
  }

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }
  toggleDropdown(dropdownName: string) {
    this.dropdownStates[dropdownName] = !this.dropdownStates[dropdownName];
  }

  data:any;
  constructor(private http: HttpClient, private router: Router) {
    this.http.get('http://localhost:8080/api/admin/leases').subscribe(data => {

      this.data = data;
      setTimeout(()=>{
        $('#applications').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          lengthMenu : [10, 25, 50],
        });

        applyStylesToElements()
      }, 1);
    }, error => console.error(error));

    function applyStylesToElements() {
      console.log('aaaa ')
      const styleProperties = {
        backgroundColor: "#FFF",
        margin: "5px"
      };

      const elements = document.getElementsByClassName("dt-input");

      for (let i = 0; i < elements.length; i++) {
          const element = elements[i] as HTMLElement;
          Object.assign(element.style, styleProperties);
      }

      const tableElement = document.getElementById('applications');
      if (tableElement) {
        tableElement.style.width = '';
      } else {
        console.error(`Element with ID 'applications' not found.`);
      }
  openEmailForm(email: string) {
    this.router.navigate(['/admin/inbox', { email: email }]);
  }
      tableElements.forEach(id => {
        const element = document.getElementById(id) as HTMLInputElement;
        Object.assign(element.style, styleProperties);
      });

          tableElements.forEach(id => {
            const element = document.getElementById(id) as HTMLInputElement;
            Object.assign(element.style, styleProperties);
          });

  toggleDropdown(dropdownName: string) {
    this.dropdownStates[dropdownName] = !this.dropdownStates[dropdownName];
  }
      const tableElement = document.getElementById('applications') as HTMLInputElement;
      tableElement.style.width = '';
    }
  }
}
