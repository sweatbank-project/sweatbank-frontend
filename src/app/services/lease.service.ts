import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { UserLeasesResponseData } from './data';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  localUrl = 'http://localhost:8080/api/user/';
  url = 'https://sweatbank-backend.onrender.com/api/user';

  getUserLeases(username: string): Observable<HttpResponse<UserLeasesResponseData>> {
    return this.httpClient.get<UserLeasesResponseData>(
      this.url + username + '/leases', { observe: 'response', responseType: 'json'}).pipe(timeout(2000));
  }

  submit(leaseForm: String): Observable<HttpResponse<any>> {
    const headers = { 'Content-Type': 'application/json' };

    // TODO: set URL to localhost or render backend depending on environment.
    return this.httpClient.post<any>("http://localhost:8080/api/lease/create", leaseForm, {headers});
  }
}
