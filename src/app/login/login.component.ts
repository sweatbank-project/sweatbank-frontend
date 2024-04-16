import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
