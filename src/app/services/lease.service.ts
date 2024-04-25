import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  submit(leaseForm: String): Observable<HttpResponse<any>> {
    const headers = { 'Content-Type': 'application/json' };

    // TODO: set URL to localhost or render backend depending on environment.
    return this.httpClient.post<any>("http://localhost:8080/api/lease/create", leaseForm, {headers});
  }
}
