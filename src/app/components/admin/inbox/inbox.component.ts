import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent {
  isClosed: boolean = false;

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }

  data:any;
  constructor(private http: HttpClient){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data => {

      this.data = data;
      setTimeout(()=>{
        $('#applications').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          lengthMenu : [10, 25, 50],
        } );
      }, 1);
    }, error => console.error(error));
  }
}
