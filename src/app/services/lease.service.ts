import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError, timeout } from 'rxjs';
import { UserLeasesResponseData } from './data';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeaseService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  baseUrl = 'http://localhost:8080/api/';
  // baseUrl = 'https://sweatbank-backend.onrender.com/api/';

  getUserLeases(
    username: string
  ): Observable<HttpResponse<UserLeasesResponseData>> {
    return this.httpClient
      .get<UserLeasesResponseData>(
        this.baseUrl + 'user/' + username + '/leases',
        { observe: 'response', responseType: 'json' }
      )
      .pipe(timeout(2000));
  }

  submit(leaseForm: String): Observable<HttpResponse<any>> {
    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient
      .post<any>(this.baseUrl + 'lease/create', leaseForm, {
        headers,
        observe: 'response',
      })
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }
}
