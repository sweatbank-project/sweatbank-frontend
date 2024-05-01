import { Component, OnInit } from '@angular/core';
import {DatePipe, NgClass, CommonModule} from "@angular/common";
import {Router, RouterLink, ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MailSendService } from "../../../mail-send.service";
import { environment } from '../../../../environments/environment';

interface Email {
  id: number;
  recipient: string;
  sender: string;
  subject: string;
  body: string;
  time: Date;
  messages: Message[];
  open: boolean;
  applicationId: string | null;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  time: Date;
}

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    DatePipe,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  activeCategory: string = 'inbox';
  emails: Email[] = [];
  selectedEmail: Email | null = null;
  currentTime = new Date();
  newEmailRecipient: string = '';
  newEmailSubject: string = '';
  newEmailBody: string = '';
  composingEmail: boolean = false;
  searchTerm: string = '';
  applicationId: string | null = null;
  error: string | null = null;


  get filteredEmails(): Email[] {
    if (!this.searchTerm) return this.emails;

    return this.emails.filter(email => {
      const term = this.searchTerm.toLowerCase();
      return (
        email.sender.toLowerCase().includes(term) ||
        email.recipient.toLowerCase().includes(term) ||
        email.id.toString() === term
      );
    });
  }
  constructor(private http: HttpClient, private route: ActivatedRoute, private titleService: Title, private mailSendService: MailSendService, private router: Router,) {
    this.titleService.setTitle("Sweatbank Admin Inbox");
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.applicationId = params['applicationId'];
      const email = params['email'];
      if (email) {
        this.composeEmailToCustomer(email);
      }
    });
    this.loadEmails();

    const storedEmails = localStorage.getItem('emails');
    if (storedEmails) {
      this.emails = JSON.parse(storedEmails);
    }
  }
  composeEmailToCustomer(email: string): void {
    this.newEmailRecipient = email;
    this.newEmailSubject = 'Response to Your Application';
    this.newEmailBody = 'Dear customer,';
    this.composingEmail = true;
  }

  filterEmails(category: string): void {
    this.activeCategory = category;}

  toggleEmailDetail(email: Email): void {
    if (this.selectedEmail?.id === email.id && email.open) {
      this.selectedEmail = null;
    } else {
      this.selectedEmail = email;
    }
    email.open = !email.open;
  }
  composeNewEmail(): void {
    this.composingEmail = true;
  }

  saveEmailsToLocalStorage(): void {
    localStorage.setItem('emails', JSON.stringify(this.emails));
  }


  sendNewEmail(): void {
    const newEmail: Email = {
      id: Math.max(...this.emails.map(e => e.id)) + 1,
      recipient: this.newEmailRecipient,
      sender: 'Admin',
      subject: this.newEmailSubject,
      body: this.newEmailBody,
      applicationId: this.applicationId,
      time: new Date(),
      open: false,
      messages: []
    };

    this.mailSendService.sendNewEmail(newEmail).subscribe({
        next: () => {
          this.emails.unshift(newEmail);
          this.saveEmailsToLocalStorage();
          this.resetComposeForm();
          this.router.navigate(['/admin/inbox']);
        },
      error: (error: HttpErrorResponse) => {
        if (error.error.errors.length > 0) {
          this.error = error.error.errors[0];
        }
      }
    });
  }
  approvedEmail(email: Email): void {
    this.mailSendService.approvedEmail(email).subscribe({
      next: () => {
        this.router.navigate(['/admin/inbox']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.error.errors.length > 0) {
          this.error = error.error.errors[0];
        }
      }
    });
  }

  rejectEmail(email: Email): void {
    this.mailSendService.rejectEmail(email).subscribe({
      next: () => {this.router.navigate(['/admin/inbox']);
        },
      error: (error: HttpErrorResponse) => {
        if(error.error.errors.length > 0) {
          this.error = error.error.errors[0];
        }
      }
    });
  }

  resetComposeForm(): void {
    this.composingEmail = false;
    this.newEmailRecipient = '';
    this.newEmailSubject = '';
    this.newEmailBody = '';
  }
  get emailCount(): number {
    return this.emails.length;
  }

  deleteEmail(email: Email): void {
    const index = this.emails.findIndex(e => e.id === email.id);
    if (index !== -1) {
      this.emails.splice(index, 1);
      this.saveEmailsToLocalStorage();
    }
  }

  cancelCompose(): void {
    this.composingEmail = false;
    this.newEmailRecipient = '';
    this.newEmailSubject = '';
    this.newEmailBody = '';
  }
  loadEmails(): void {
    this.mailSendService.requestEmails().subscribe({
      next: (data) => {
        this.emails = data;
      },
      error: (error) => {
        this.error = 'Failed to load emails';
      }
    });
  }
}
