import { Component } from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isClosed: boolean = true;

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }
}
