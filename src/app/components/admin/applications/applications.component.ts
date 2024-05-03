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
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {
  faEye,
  faEyeSlash,
  faL,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { UpdateRequestBody } from '../../../types';
import { AdminService } from '../../../services/admin.service';
import { response } from 'express';
import { error } from 'jquery';

interface ApplicationFormValue {
  leasingPeriod: number | string;
  downPaymentPercentage: number | string;
  euriborType: string;
  euriborRate: number | string;
  margin: number | string;
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
    TooltipModule,
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
  loanServiceRate: any;

  dataTable: any;

  private readonly adminService = inject(AdminService)

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
    
    this.fetchLeases()

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

    this.updateFormState();

    const requestBody = this.generateCalculationRequestBody();
    this.sendCalculateSolvencyRequest(requestBody);
    this.showModal();
    if (this.selectedEntity) {
      this.applicationForm.patchValue({
        // Converting leasing period years to months
        leasingPeriod: this.selectedEntity.leasingPeriod * 12,
        downPaymentPercentage: this.selectedEntity.downPaymentPercentage,
        euriborType: this.selectedEntity.euriborType,
        euriborRate: this.selectedEntity.euriborRate,
        margin: this.selectedEntity.margin,
        loanServiceRate: this.selectedEntity.loanServiceRate
      });
    }
  }

  extractRequestBody(
    selectedEntity: any,
    applicationFormValue: ApplicationFormValue,
    statusOverride?: string
  ): UpdateRequestBody {
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

    const reqBody: UpdateRequestBody = Object.fromEntries(
      keysToExtract.map((key) => [key, modifiedLease[key]])
    ) as UpdateRequestBody;

    return reqBody;
  }

  saveApplication() {
    console.log('Save data to db, Status => Pending');
    const reqBody = this.extractRequestBody(
      this.selectedEntity,
      this.applicationForm.value,
      'PENDING'
    );
    console.log(reqBody);
    this.sendUpdateRequest(reqBody);
  }

  approveApplication() {
    console.log('Save data to db, Status => Approve');
    const reqBody = this.extractRequestBody(
      this.selectedEntity,
      this.applicationForm.value,
      'APPROVED'
    );
    this.hideModal();
    console.log(reqBody);
    this.sendUpdateRequest(reqBody);
  }

  rejectApplication() {
    console.log('Save data to db, Status => Reject');
    const reqBody = this.extractRequestBody(
      this.selectedEntity,
      this.applicationForm.value,
      'REJECTED'
    );
    this.hideModal();
    console.log(reqBody);
    this.sendUpdateRequest(reqBody);
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

  initializeDataTable(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
    }

    this.dataTable = $('#applications').DataTable({
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu: [10, 25, 50]
    });
    this.applyStylesToElements();
  }

  fetchLeases() {
    this.isLoading = true;
    this.http.get(environment.apiUrl + 'admin/leases').subscribe(
      (data) => {
        this.isLoading = false;
        this.data = data;
        setTimeout(() => {
          this.initializeDataTable();
        }, 1);
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  applyStylesToElements() {
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

  sendUpdateRequest(requestData: UpdateRequestBody): void {
    this.isLoading = true;
    this.adminService.updateLease(requestData).subscribe({
      next: () => {
        const requestBody = this.generateCalculationRequestBody();
        this.sendCalculateSolvencyRequest(requestBody);
      },
      error: (error) => {
        this.isLoading = false;
        console.log("error mesage: " + error.message);
      },
      complete: () => {
        this.isLoading = false;
        this.fetchLeases()
      }
    })
  }

  sendCalculateSolvencyRequest(requestData: any): void {
    this.adminService.calculateSolvency(requestData).subscribe({
      next: (response) => {
        console.log(response);
        this.loanServiceRate = response.loanServiceRate;
      },
      error: (error) => {
        this.isLoading = false;
        console.log("error mesage: " + error.message);
      }
    })
  }

  generateCalculationRequestBody() {
    return {
      applicationId: this.selectedEntity.applicationId
    };
  }  
 
  getLoanServiceRateColor(): string {
    if (this.loanServiceRate >= 40) {
      return 'red';
    } else {
      return 'green';
    }
  }

  private updateFormState(): void {
    if (this.isApprovedOrRejected()) {
      this.applicationForm.disable();
    } else {
      this.applicationForm.enable();
    }
  }

  isApprovedOrRejected(): boolean {
    return this.selectedEntity && (this.selectedEntity.status === 'APPROVED' || this.selectedEntity.status === 'REJECTED');
  }

}