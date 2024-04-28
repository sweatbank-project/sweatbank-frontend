import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import { passwordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faSpinner = faSpinner;

  passwordVisible: boolean = false;
  isLoading = false;

  error: string | null = null;

  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),
    password: new FormControl('', [Validators.required, passwordValidator()]),
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    this.isLoading = true;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['home']);
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'Invalid email or password';
      },
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
