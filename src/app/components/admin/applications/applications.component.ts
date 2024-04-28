import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, NgClass, NgForOf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BsModalRef,
  BsModalService,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import {
  calculateDownPayment,
  calculateMonthlyPayment,
  calculateTotalInterestRate,
} from '../../../core/utility';
import { ModalModule } from 'ngx-bootstrap/modal';

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
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss',
})
export class ApplicationsComponent {
  @ViewChild(ModalDirective, { static: false }) modal?: ModalDirective;

  applicationForm: FormGroup;
  selectedEntity: any;

  showModal() {
    this.modal?.show();
  }

  dropdownStates: { [key: string]: boolean } = {
    dropdown1: false,
  };

  toggleDropdown(dropdownName: string) {
    this.dropdownStates[dropdownName] = !this.dropdownStates[dropdownName];
  }

  openEmailForm(email: string) {
    this.router.navigate(['/admin/inbox', { email: email }]);
  }

  data: any;
  constructor(private router: Router, private http: HttpClient) {
    this.http.get('http://localhost:8080/api/admin/leases').subscribe(
      (data) => {
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
      this.selectedEntity.downPaymentAmount = calculateDownPayment(
        this.selectedEntity.costOfCar,
        data.downPaymentPercentage
      );

      // Calculate total interest
      this.selectedEntity.interestRate = calculateTotalInterestRate(
        data.euriborRate,
        data.margin
      );

      // Calculate monthly payment
      this.selectedEntity.monthlyPaymentAmount = calculateMonthlyPayment(
        this.selectedEntity.costOfCar,
        this.selectedEntity.downPaymentAmount,
        this.selectedEntity.interestRate,
        data.leasingPeriod
      );
    });
  }

  openModal(id: number) {
    this.selectedEntity = this.mockData.entities.find(
      (entity: any) => entity.id === id
    )!;
    this.modal?.show();
    if (this.selectedEntity) {
      this.applicationForm.patchValue({
        leasingPeriod: this.selectedEntity.leasingPeriodMonths,
        downPaymentPercentage: this.selectedEntity.downPaymentPercentage,
        euriborType: this.selectedEntity.euriborType,
        euriborRate: this.selectedEntity.euriborRate,
        margin: this.selectedEntity.margin,
      });
    }
  }

  saveApplication() {
    console.log('Save data to db, Status => Pending');
    this.modal?.hide();
  }

  approveApplication() {
    console.log('Save data to db, Status => Approve');
    this.modal?.hide();
  }

  rejectApplication() {
    console.log('Save data to db, Status => Reject');
    this.modal?.hide();
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
    { term: 'Euribor 3-month', value: 3.922 },
    { term: 'Euribor 6-month', value: 3.893 },
    { term: 'Euribor 1-year', value: 3.716 },
  ];

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
        monthlyPaymentAmount: 770.04,
      },
    ],
  };
}
