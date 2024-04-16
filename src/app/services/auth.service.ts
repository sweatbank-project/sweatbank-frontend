import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

// interface AuthResponseData {
//   token: string;
//   role: string;
// }

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly client = inject(HttpClient);

  login(email: string, password: string): Observable<any> {
    return this.client.post('localhost:8080/api/auth/login', {
      username: email,
      password,
    });
  }

  // login(email: string, password: string): Observable<AuthResponseData> {
  //   const mockResponse: AuthResponseData = {
  //     token: 'mock-token',
  //     role: 'user',
  //   };
  //   if (email === 'test@test.com' && password === '12345') {
  //     return of(mockResponse);
  //   } else {
  //     return throwError('Invalid email or password');
  //   }
  // }
}
