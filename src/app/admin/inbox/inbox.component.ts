import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

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
}
