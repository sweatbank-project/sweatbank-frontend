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

  openEmailForm(email: string) {
    this.router.navigate(['/admin/inbox', { email: email }]);
  }

  data: any;
  constructor(private router: Router, private http: HttpClient) {
    this.isLoading = true;
    this.http.get(environment.apiUrl + 'admin/leases').subscribe(
      (data) => {
        this.isLoading = false;
        this.data = data;
        console.log(data);
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
    console.log(this.selectedEntity);
    this.showModal();
    if (this.selectedEntity) {
      this.applicationForm.patchValue({
        leasingPeriod: this.selectedEntity.leasingPeriod * 12,
        downPaymentPercentage: this.selectedEntity.downPaymentPercentage,
        euriborType: this.selectedEntity.euriborType,
        euriborRate: this.selectedEntity.euriborRate,
        margin: this.selectedEntity.margin,
      });
    }
  }

  saveApplication() {
    console.log('Save data to db, Status => Pending');
    this.hideModal();
    // Converting leasing period months back to years
    const leasingPeriod = this.applicationForm.value.leasingPeriod / 12;
    const modifiedLease = {
      ...this.selectedEntity,
      ...this.applicationForm.value,
      leasingPeriod,
    };

    console.log(modifiedLease);
  }

  approveApplication() {
    console.log('Save data to db, Status => Approve');
    this.hideModal();
    const modifiedLease = {
      ...this.selectedEntity,
      ...this.applicationForm.value,
    };
    console.log(modifiedLease);
  }

  rejectApplication() {
    console.log('Save data to db, Status => Reject');
    this.hideModal();
    const modifiedLease = {
      ...this.selectedEntity,
      ...this.applicationForm.value,
    };
    console.log(modifiedLease);
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
