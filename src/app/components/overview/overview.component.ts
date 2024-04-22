import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EuriborService } from '../../services/euribor.service';
import {
  calculateDownPayment,
  calculateMonthlyPayment,
  calculateTotalInterestRate,
} from './utility';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  applicationForm: FormGroup;
  selectedEntity: any;

  euriborService = inject(EuriborService);

  constructor() {
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
    this.selectedEntity = this.data.entities.find(
      (entity) => entity.id === id
    )!;
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
  }

  approveApplication() {
    console.log('Save data to db, Status => Approve');
  }

  rejectApplication() {
    console.log('Save data to db, Status => Reject');
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

  data = {
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
