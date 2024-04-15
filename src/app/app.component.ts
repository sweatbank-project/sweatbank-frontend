import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, LoginComponent, HeaderComponent, HomeComponent],
})
export class AppComponent {
  title = 'sweatbank';
}
