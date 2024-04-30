import { Component, HostListener, inject } from '@angular/core';
import {
  FormBuilder,
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
import { birthDateValidator } from '../../validators/birth-date.validator';
import { personalIdValidator } from '../../validators/personal-id.validator';
import { phoneNumberValidator } from '../../validators/phone-number.validator';
import { passwordValidator } from '../../validators/password.validator';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faSpinner = faSpinner;
  
  passwordVisible: { [key: string]: boolean } = {
    password1: false,
    password2: false
  };

  isLoading = false;

  error: string | null = null;

  authService = inject(AuthService);
  router = inject(Router);

  registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),

    phone: new FormControl('', [Validators.required, phoneNumberValidator()]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required, birthDateValidator()]),
    address: new FormControl('', [Validators.required]),
    personalId: new FormControl('', [Validators.required, personalIdValidator()]),
    password1: new FormControl('', [Validators.required, passwordValidator()]),
    password2: new FormControl('', [Validators.required, passwordValidator()]),
  });

  onSubmit(): void {
    const firstnameControl = this.registerForm.get('firstname');
    const lastnameControl = this.registerForm.get('lastname');
    
    if (firstnameControl && lastnameControl) {
        const controls = [firstnameControl, lastnameControl];
    
        controls.forEach(control => {
            const value = control.value;
    
            if (typeof value === 'string' && value.trim() !== '') {
                const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                control.setValue(capitalizedValue);
            }
        });
    }
    
    if(this.registerForm.value.password1 != this.registerForm.value.password2) {
      this.error = 'Passwords do not match.'
      return;
    }

    if (this.registerForm.invalid) {
      return;
    }

    const username = this.registerForm.value.email as string;
    const phoneNumber = this.registerForm.value.phone as string;
    const personalId = this.registerForm.value.personalId as string;
    const password = this.registerForm.value.password1 as string;
    const firstName = this.registerForm.value.firstname as string;
    const lastName = this.registerForm.value.lastname as string;
    const birthDate = this.registerForm.value.birthDate as string;
    const address = this.registerForm.value.address as string;
    const confirmPassword = this.registerForm.value.password2 as string;

    this.isLoading = true;

    this.authService.register(username,phoneNumber,personalId,password,firstName,lastName,birthDate,address,confirmPassword).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'An unexpected error occurred. Please try again later.';
      },
    });
  }

  togglePasswordVisibility(inputId: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    inputElement.type = this.passwordVisible ? 'password' : 'text';

    this.passwordVisible[inputId] = !this.passwordVisible[inputId];
  }
}
