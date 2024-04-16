import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

interface AuthResponseData {
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(email: string, password: string): Observable<AuthResponseData> {
    const mockResponse: AuthResponseData = {
      token: 'mock-token',
      role: 'user',
    };
    if (email === 'test@test.com' && password === '12345') {
      return of(mockResponse);
    } else {
      return throwError('Invalid email or password');
    }
  }
}
