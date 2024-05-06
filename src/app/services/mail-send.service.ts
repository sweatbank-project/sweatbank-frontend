import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MailSendService {

  constructor(private httpClient: HttpClient) {}

  sendNewEmail(
    recipient: string,
    subject: string,
    message: string,
    applicationId: string
  ): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(
      environment.apiUrl + 'admin/send-message',
      {
        recipient,
        subject,
        body: message,
        applicationId,
      }
    );
  }

  rejectEmail(
    recipient: string,
    subject: string,
    message: string,
    applicationId: string
  ): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(
      environment.apiUrl + 'admin/send-message/reject',
      {
        recipient,
        subject,
        body: message,
        applicationId,
      }
    );
  }

  approvedEmail(
    recipient: string,
    subject: string,
    message: string,
    applicationId: string
  ): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(
      environment.apiUrl + 'admin/send-message/approved',
      {
        recipient,
        subject,
        body: message,
        applicationId,
      }
    );
  }
}
