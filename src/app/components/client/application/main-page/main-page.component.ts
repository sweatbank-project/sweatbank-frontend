import { Component } from '@angular/core';
import { FooterComponent } from '../../assets/footer/footer.component';
import { HeaderComponent } from '../../assets/header/header.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
