import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError, tap, Subject } from 'rxjs';
import { error } from 'jquery';
import { environment } from '../../environments/environment';
import { Message } from '../components/admin/inbox/inbox.component';

@Injectable({
  providedIn: 'root',
})
export class MailSendService {
  private apiUrl = environment.apiUrl;

  baseUrl = 'http://localhost:8080/api/';
  // baseUrl = 'https://sweatbank-backend.onrender.com/api/';

  constructor(private httpClient: HttpClient) {}

  sendNewEmail(
    recipient: string,
    subject: string,
    message: string,
    applicationId: string
  ): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.apiUrl + 'admin/send-message', {
      recipient,
      subject,
      body: message,
      applicationId,
    });
  }

  rejectEmail(
    recipient: string,
    subject: string,
    message: string,
    applicationId: string
  ): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.apiUrl + 'admin/reject', {
      recipient,
      subject,
      body: message,
      applicationId,
    });
  }
  approvedEmail(
    recipient: string,
    subject: string,
    message: string,
    applicationId: string
  ): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.apiUrl + 'admin/approved', {
      recipient,
      subject,
      body: message,
      applicationId,
    });
  }
}
