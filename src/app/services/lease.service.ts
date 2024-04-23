import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { UserLeasesResponseData } from './data';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {
  private readonly client = inject(HttpClient);

  localUrl = 'http://localhost:8080/api/user/';
  url = 'https://sweatbank-backend.onrender.com/api/user';

  getUserLeases(username: string): Observable<HttpResponse<UserLeasesResponseData>> {
    return this.client.get<UserLeasesResponseData>(
      this.url + username + '/leases', { observe: 'response', responseType: 'json'}).pipe(timeout(2000));
  }
}
