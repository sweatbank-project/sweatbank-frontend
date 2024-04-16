import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

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

  authService = inject(AuthService);

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

    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    if (!email || !password) {
      return;
    }

    this.authService.login(email, password).subscribe(
      (resData) => {
        console.log(resData);
      },
      (error) => {
        console.log(error);
      }
    );

    this.loginForm.reset();
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
