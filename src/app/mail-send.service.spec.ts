import { TestBed } from '@angular/core/testing';

import { MailSendService } from './services/mail-send.service';

describe('MailSendService', () => {
  let service: MailSendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailSendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
