import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface AuthResponseData {
  token: string;
  role: string;
}

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
        this.url,
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
            this.handleAuthentication(token, resData.body!.role);
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

  private handleAuthentication(token: string, role: string) {
    sessionStorage.setItem('userData', JSON.stringify({ token, role }));
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
