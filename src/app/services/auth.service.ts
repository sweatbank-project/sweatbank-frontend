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

  //baseUrl = 'http://localhost:8080/api/';
  baseUrl = 'https://sweatbank-backend.onrender.com/api/';

  login(
    email: string,
    password: string
  ): Observable<HttpResponse<AuthResponseData>> {
    return this.client
      .post<AuthResponseData>(
        this.baseUrl+'auth/login',
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
        this.baseUrl+'auth/register',
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

  handleAuthentication(token: string, role: string, firstName: string, lastName: string, username: string, phoneNumber: string, address: string, birthDate: string) {
    sessionStorage.setItem('userData', JSON.stringify({ token, role, firstName, lastName, username, phoneNumber, address, birthDate }));
  }

  getUserName(): string {
    return this.getUserData('username');
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
