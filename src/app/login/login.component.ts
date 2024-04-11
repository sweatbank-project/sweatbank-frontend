import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  passwordVisible: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.loginForm.reset();
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
