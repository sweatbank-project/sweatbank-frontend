import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, NgClass, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isClosed: boolean = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }
}
