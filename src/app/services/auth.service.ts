import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponseData } from './data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly client = inject(HttpClient);
  private readonly router = inject(Router);

  localUrl = 'http://localhost:8080/api/auth/login';
  url = 'https://sweatbank-backend.onrender.com/api/auth/login';

  login(
    email: string,
    password: string
  ): Observable<HttpResponse<AuthResponseData>> {
    return this.client
      .post<AuthResponseData>(
        this.localUrl,
        {
          username: email,
          password,
        },
        { observe: 'response' }
      )
      .pipe(
        tap((resData) => {
          const token = resData.headers.get('authorization');
          if (token) {
            this.handleAuthentication(token,
              resData.body!.role,
              resData.body?.user.firstName || '',
              resData.body?.user.lastName || '',
              resData.body?.user.username || '',
              resData.body?.user.phoneNumber || '',
              resData.body?.user.address || '',
              resData.body?.user.birthdate.toString() || '',
            );
          }
        })
      );
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

  handleAuthentication(token: string, role: string, firstName: string, lastName: string, username: string, phoneNumber: string, address: string, birthDate: string) {
    sessionStorage.setItem('userData', JSON.stringify({ token, role, firstName, lastName, username, phoneNumber, address, birthDate }));
  }

  getUserData(key: string): string {
    const data = sessionStorage.getItem('userData');
    if (data) {
      const userData = JSON.parse(data);
      return userData[key] || '';
    }
    return '';
  }
}
