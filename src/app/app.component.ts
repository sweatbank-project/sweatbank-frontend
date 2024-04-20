import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LoginComponent} from "./components/shared/login/login.component";
import {HeaderComponent} from "./components/client/assets/header/header.component";
import {FooterComponent} from "./components/client/assets/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  title = 'sweatbank';
}
