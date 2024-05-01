import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule, NgClass, NgForOf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {
  calculateDownPayment,
  calculateMonthlyPayment,
  calculateTotalInterestRate,
} from '../../../core/utility';
import { ModalModule } from 'ngx-bootstrap/modal';
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';

interface ApplicationFormValue {
  leasingPeriod: number | string;
  downPaymentPercentage: number | string;
  euriborType: string;
  euriborRate: number | string;
  margin: number | string;
}
interface RequestBody {
  applicationId: string;
  status: string;
  downPayment: number;
  downPaymentPercentage: number;
  euriborRate: number;
  euriborType: string;
  interestRate: number;
  leasingPeriod: number;
  margin: number;
  monthlyPayment: number;
}

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    NgForOf,
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    FontAwesomeModule,
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss',
})
export class ApplicationsComponent {
  @ViewChild(ModalDirective, { static: false }) modal?: ModalDirective;

  isLoading = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faSpinner = faSpinner;

  applicationForm: FormGroup;
  selectedEntity: any;

  showModal() {
    this.modal?.show();
  }

  hideModal() {
    this.modal?.hide();
  }

  openEmailForm(applicationId: string) {
    this.router.navigate(['/admin/inbox', { applicationId: applicationId }]);
  }

  data: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private titleService: Title
  ) {
    this.titleService.setTitle('Sweatbank Admin Applications');
    this.isLoading = true;
    this.http.get(environment.apiUrl + 'admin/leases').subscribe(
      (data) => {
        this.isLoading = false;
        this.data = data;
        setTimeout(() => {
          $('#applications').DataTable({
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            lengthMenu: [10, 25, 50],
          });
          applyStylesToElements();
        }, 1);
      },
      (error) => console.error(error)
    );

    function applyStylesToElements() {
      const styleProperties = {
        backgroundColor: '#FFF',
        margin: '5px',
      };

      const elements = document.getElementsByClassName('dt-input');

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        Object.assign(element.style, styleProperties);
      }

      const tableElement = document.getElementById('applications');
      if (tableElement) {
        tableElement.style.width = '';
      } else {
        console.error(`Element with ID 'applications' not found.`);
      }
    }

    //---MODAL---
    this.applicationForm = new FormGroup({
      leasingPeriod: new FormControl('', {
        updateOn: 'blur',
      }),
      downPaymentPercentage: new FormControl('', {
        updateOn: 'blur',
      }),
      euriborType: new FormControl('', {
        updateOn: 'blur',
      }),
      euriborRate: new FormControl('', {
        updateOn: 'blur',
      }),
      margin: new FormControl('', {
        updateOn: 'blur',
      }),
    });

    this.applicationForm.valueChanges.subscribe((data) => {
      // Calculate down payment
      this.selectedEntity.downPayment = calculateDownPayment(
        this.selectedEntity.carCost,
        data.downPaymentPercentage
      );

      // Calculate total interest
      this.selectedEntity.interestRate = calculateTotalInterestRate(
        data.euriborRate,
        data.margin
      );

      // Calculate monthly payment
      this.selectedEntity.monthlyPayment = calculateMonthlyPayment(
        this.selectedEntity.carCost,
        this.selectedEntity.downPayment,
        this.selectedEntity.interestRate,
        data.leasingPeriod
      );
    });
  }

  openModal(id: number) {
    this.selectedEntity = this.data.leases.find(
      (entity: any) => entity.applicationId === id
    )!;
    this.showModal();
    if (this.selectedEntity) {
      this.applicationForm.patchValue({
        // Converting leasing period years to months
        leasingPeriod: this.selectedEntity.leasingPeriod * 12,
        downPaymentPercentage: this.selectedEntity.downPaymentPercentage,
        euriborType: this.selectedEntity.euriborType,
        euriborRate: this.selectedEntity.euriborRate,
        margin: this.selectedEntity.margin,
      });
    }
  }

  extractRequestBody(
    selectedEntity: any,
    applicationFormValue: ApplicationFormValue,
    statusOverride?: string
  ): RequestBody {
    // Converting leasing period months back to years
    const leasingPeriod = +applicationFormValue.leasingPeriod / 12;
    const modifiedLease = {
      ...selectedEntity,
      ...applicationFormValue,
      leasingPeriod,
    };

    if (statusOverride) {
      modifiedLease.status = statusOverride;
    }

    const keysToExtract = [
      'applicationId',
      'status',
      'downPayment',
      'downPaymentPercentage',
      'euriborRate',
      'euriborType',
      'interestRate',
      'leasingPeriod',
      'margin',
      'monthlyPayment',
    ];

    const reqBody: RequestBody = Object.fromEntries(
      keysToExtract.map((key) => [key, modifiedLease[key]])
    ) as RequestBody;

    return reqBody;
  }

  saveApplication() {
    console.log('Save data to db, Status => Pending');
    this.hideModal();
    const reqBody = this.extractRequestBody(
      this.selectedEntity,
      this.applicationForm.value,
      'PENDING'
    );
    console.log(reqBody);
  }

  approveApplication() {
    console.log('Save data to db, Status => Approve');
    this.hideModal();
    const reqBody = this.extractRequestBody(
      this.selectedEntity,
      this.applicationForm.value,
      'APPROVED'
    );
    console.log(reqBody);
  }

  rejectApplication() {
    console.log('Save data to db, Status => Reject');
    this.hideModal();
    const reqBody = this.extractRequestBody(
      this.selectedEntity,
      this.applicationForm.value,
      'REJECTED'
    );
    console.log(reqBody);
  }

  changeEuribor(e: any) {
    const changedTerm = e.target.value;
    const changedValue = this.euriborData.find(
      (val) => val.term === changedTerm
    )?.value;
    this.applicationForm.patchValue({ euriborRate: changedValue });
    this.selectedEntity.euriborRate = changedValue;
  }

  euriborData: { term: string; value: number }[] = [
    { term: 'EURIBOR_3_MONTH', value: 3.922 },
    { term: 'EURIBOR_6_MONTH', value: 3.893 },
    { term: 'EURIBOR_12_MONTH', value: 3.716 },
  ];
  leasingPeriodMonths = [12, 24, 36, 48, 60];

  formatEuriborRes(response: string): string {
    const parts = response.split('_');
    const formattedParts: string[] = [];

    parts.forEach((part, index) => {
      const formattedPart =
        index === 0
          ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          : part.toLowerCase();
      formattedParts.push(formattedPart);
    });

    let formattedResponse = formattedParts.join(' ');

    const lastPart = formattedParts[formattedParts.length - 1];
    if (lastPart === 'month') {
      formattedResponse =
        formattedResponse.substring(0, formattedResponse.length) + 's';
    }

    return formattedResponse;
  }

  mockData = {
    entities: [
      {
        id: 1,
        car: 'Skoda Kodiaq 2004',
        leasingPeriodMonths: 60,
        costOfCar: 40000,
        downPaymentPercentage: 15,
        downPaymentAmount: 6000,
        downPaymentSource: 'Savings',
        contractFeeAmount: 200,
        euriborType: 'Euribor 3-month',
        euriborRate: 3.922,
        margin: 2.222,
        interestRate: 6.144,
        monthlyPayment: 770.04,
      },
    ],
  };
}
