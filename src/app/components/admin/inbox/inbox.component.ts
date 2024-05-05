import { Component, OnInit } from '@angular/core';
import { DatePipe, NgClass, CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MailSendService } from '../../../services/mail-send.service';
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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

export interface Message {
  id: number;
  sender: string;
  text: string;
  time: Date;
}

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [NgClass, RouterLink, DatePipe, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
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

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faSpinner = faSpinner;
  isSendingEmail = false;

  get filteredEmails(): Email[] {
    if (!this.searchTerm) return this.emails;

    return this.emails.filter((email) => {
      const term = this.searchTerm.toLowerCase();
      return (
        email.sender.toLowerCase().includes(term) ||
        email.recipient.toLowerCase().includes(term) ||
        email.id.toString() === term
      );
    });
  }
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private mailSendService: MailSendService,
    private router: Router
  ) {
    this.titleService.setTitle('Sweatbank Admin Inbox');
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.applicationId = params['applicationId'];
      const email = params['email'];
      if (email) {
        this.composeEmailToCustomer(email);
      }
    });

    const storedEmails = localStorage.getItem('emails');
    if (storedEmails) {
      this.emails = JSON.parse(storedEmails);
      this.emails.forEach((email) => (email.open = false));
    }
  }
  composeEmailToCustomer(email: string): void {
    this.newEmailRecipient = email;
    this.newEmailSubject = 'Response to Your Application';
    this.newEmailBody = 'Dear customer,';
    this.composingEmail = true;
  }

  filterEmails(category: string): void {
    this.activeCategory = category;
  }

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
    if (!this.isSendingEmail) {
      const newEmail: Email = {
        id: Math.max(...this.emails.map((e) => e.id)) + 1,
        recipient: this.newEmailRecipient,
        sender: 'Admin',
        subject: this.newEmailSubject,
        body: this.newEmailBody,
        applicationId: this.applicationId,
        time: new Date(),
        open: false,
        messages: [],
      };

      if (!this.newEmailRecipient || !this.newEmailSubject || !this.newEmailBody) {
        return;
      }

      this.isSendingEmail = true;

      this.mailSendService
        .sendNewEmail(
          newEmail.recipient,
          newEmail.subject,
          newEmail.body,
          newEmail.applicationId!
        )
        .subscribe({
          next: () => {
            this.emails.unshift(newEmail);
            this.saveEmailsToLocalStorage();
            this.resetComposeForm();
            this.router.navigate(['/admin/inbox']);
          },
          error: (error) => {
            console.error('Error sending email:', error);
            this.error = 'Failed to send email. Please try again.';
          },
          complete: () => {
            this.isSendingEmail = false;
          }
        });
    }
  }

  approvedEmail(): void {
    const newEmail: Email = {
      id: Math.max(...this.emails.map((e) => e.id)) + 1,
      recipient: this.newEmailRecipient,
      sender: 'Admin',
      subject: this.newEmailSubject,
      body: this.newEmailBody,
      applicationId: this.applicationId,
      time: new Date(),
      open: false,
      messages: [],
    };

    this.mailSendService
      .approvedEmail(
        newEmail.recipient,
        newEmail.subject,
        newEmail.body,
        newEmail.applicationId!
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/inbox']);
        },
      });
  }

  rejectEmail(): void {
    const newEmail: Email = {
      id: Math.max(...this.emails.map((e) => e.id)) + 1,
      recipient: this.newEmailRecipient,
      sender: 'Admin',
      subject: this.newEmailSubject,
      body: this.newEmailBody,
      applicationId: this.applicationId,
      time: new Date(),
      open: false,
      messages: [],
    };

    this.mailSendService
      .rejectEmail(
        newEmail.recipient,
        newEmail.subject,
        newEmail.body,
        newEmail.applicationId!
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/inbox']);
        },
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
    const index = this.emails.findIndex((e) => e.id === email.id);
    if (index !== -1) {
      this.emails.splice(index, 1);
      this.saveEmailsToLocalStorage();
    }
  }

  cancelCompose(): void {
    this.isSendingEmail = false;
    this.composingEmail = false;
    this.newEmailRecipient = '';
    this.newEmailSubject = '';
    this.newEmailBody = '';
  }
}
