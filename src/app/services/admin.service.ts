import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UpdateRequestBody } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  updateLease(requestData: UpdateRequestBody): Observable<any> {
    const url = `${environment.apiUrl}admin/leases/update-lease`;
    return this.http.put(url, requestData);
  }

  calculateSolvency(requestData: any): Observable<any> {
    const url = `${environment.apiUrl}admin/leases/calculate-solvency`;
    return this.http.post(url, requestData);
  }
}
