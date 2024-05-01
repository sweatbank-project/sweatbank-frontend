import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";
import {error} from "jquery";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MailSendService {
  private apiUrl = environment.apiUrl;

  // private baseUrlSend = 'http://localhost:4200/api/admin/send-message';
  // private baseUrlReject = 'localhost:4200/api/admin/send-message/reject';
  // private baseUrlApproved = 'localhost:4200/api/admin/send-message/approved';

  constructor(private httpClient: HttpClient) {}

  sendNewEmail(email: any): Observable<HttpResponse<any>> {
    const headers = {'Content-Type': 'application/json'}

    return this.httpClient.post<any>(this.apiUrl + '/send-message', email, {headers, observe: 'response'})
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }
  rejectEmail(email: any): Observable<HttpResponse<any>> {
    const headers = {'Content-Type': 'application/json'}

    return this.httpClient.post<any>(this.apiUrl + '/reject', email, {headers, observe: 'response'})
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }
  approvedEmail(email: any): Observable<HttpResponse<any>> {
    const headers = {'Content-Type': 'application/json'}

    return this.httpClient.post<any>(this.apiUrl + '/approved', email, {headers, observe: 'response'})
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }

  requestEmails(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/emails').pipe(catchError((error: any) => {
        return throwError(error);
      })
    )
}
}
