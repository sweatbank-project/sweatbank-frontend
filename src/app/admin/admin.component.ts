import { Component } from '@angular/core';
import {HeaderComponent} from "./assets/header/header.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HeaderComponent,
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
