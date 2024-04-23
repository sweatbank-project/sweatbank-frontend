import { Component, OnInit } from '@angular/core';
import {DatePipe, NgClass, CommonModule} from "@angular/common";
import {RouterLink, ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";


interface Email {
  id: number;
  recipient: string;
  sender: string;
  subject: string;
  body: string;
  time: Date;
  read: boolean;
  messages: Message[];
  open: boolean;
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
  isClosed: boolean = false;
  activeCategory: string = 'inbox';
  emails: Email[] = [
    {
      id: 1,
      recipient: '',
      sender: 'John Doe',
      subject: 'Hello',
      body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.\n' +
        '\n' +
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.',
      time: new Date(),
      read: false,
      messages: [
        { id: 1, sender: 'John Doe', text: 'Hi there!', time: new Date() },
      ],
      open: false
    },
    {
      id: 2,
      recipient: '',
      sender: 'Jane Smith',
      subject: 'Meeting Agenda',
      body: 'Dear Team,\n\nPlease find attached the agenda for our upcoming meeting...\n\nBest regards,\nJane',
      time: new Date(),
      read: false,
      open: false,
      messages: [
        { id: 2, sender: 'John Doe', text: 'Thank you!', time: new Date() }
      ]
    },
  ];

  selectedEmail: Email | null = null;
  currentTime = new Date();
  newEmailRecipient: string = '';
  newEmailSubject: string = '';
  newEmailBody: string = '';
  composingEmail: boolean = false;
  searchTerm: string = '';
  recipientSearchTerm: string = '';


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
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const email = params['email'];
      if (email) {
        this.composeEmailToCustomer(email);
      }
    });
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

  sendNewEmail(): void {
    const newEmail: Email = {
      id: Math.max(...this.emails.map(e => e.id)) + 1,
      recipient: this.newEmailRecipient,
      sender: 'Admin',
      subject: this.newEmailSubject,
      body: this.newEmailBody,
      time: new Date(),
      read: false,
      open: false,
      messages: []
    };

    this.emails.unshift(newEmail);
    this.composingEmail = false;
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
    }
  }
  cancelCompose(): void {
    this.composingEmail = false;
  }

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }
}
