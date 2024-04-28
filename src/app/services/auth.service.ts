import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface AuthResponseData {
  token: string;
  role: string;
  user: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly client = inject(HttpClient);
  private readonly router = inject(Router);

  //localUrl = 'http://localhost:8080/api/auth/login';
  //url = 'https://sweatbank-backend.onrender.com/api/auth/login';

  baseUrl = 'http://localhost:8080/api/auth/'

  login(
    email: string,
    password: string
  ): Observable<HttpResponse<AuthResponseData>> {
    return this.client
      .post<AuthResponseData>(
        this.baseUrl+'login',
        {
          username: email,
          password,
        },
        { observe: 'response' }
      )
      .pipe(
        tap((resData) => {
          const token = resData.headers.get('authorization');
          if (token && resData.body) {
            let userName = resData.body.user.firstName + ' ' + resData.body.user.lastName;
            this.handleAuthentication(token, resData.body.role, userName);
          }
        })
      );
  }

  register(
    username: string,
    phoneNumber: string,
    personalId: string,
    password: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    address: string,
    confirmPassword: string
  ): Observable<unknown> {
    return this.client
      .post(
        this.baseUrl+'register',
        {
          username: username,
          phoneNumber: phoneNumber,
          personalId: personalId,
          password: password,
          firstName: firstName,
          lastName: lastName,
          birthDate: birthDate,
          address: address,
          confirmPassword: confirmPassword
        },
        { observe: 'response' }
      )
  }

  logout() {
    this.router.navigate(['/login']);
    sessionStorage.removeItem('userData');
  }

  getToken(): string {
    return this.getUserData('token');
  }

  getRole(): string {
    return this.getUserData('role');
  }

  getUserName(): string {
    return this.getUserData('username');
  }

  private handleAuthentication(token: string, role: string, username: string) {
    sessionStorage.setItem('userData', JSON.stringify({ token, role, username }));
  }

  private getUserData(key: string): string {
    const data = sessionStorage.getItem('userData');
    if (data) {
      const userData = JSON.parse(data);
      return userData[key] || '';
    }
    return '';
  }
}
