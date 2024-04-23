import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
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

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }
  toggleDropdown(dropdownName: string) {
    this.dropdownStates[dropdownName] = !this.dropdownStates[dropdownName];
  }

  data:any;
  constructor(private http: HttpClient){
    this.http.get('http://localhost:8080/api/admin/leases').subscribe(data => {

      this.data = data;
      setTimeout(()=>{
        $('#applications').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          lengthMenu : [10],
        } );
      }, 1);
    }, error => console.error(error));
  }
}
