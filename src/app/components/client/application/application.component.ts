import { initialCalculation } from './../../../core/utility';
import { CarData, CarModel, carData } from './data';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LeaseService } from '../../../services/lease.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
})
export class ApplicationComponent {
  @ViewChildren('activeStep') activeSteps!: QueryList<ElementRef>;
  @ViewChildren('activeStepSection') activeStepsSection!: QueryList<ElementRef>;

  leaseService: LeaseService = inject(LeaseService);

  carData: CarData = carData;
  selectedMake: CarModel | null = null;

  // extra
  userPhoneNumber = '+37061111111';
  userEmail = 'andriuha@gmail.com';
  userAddress = 'Konstitucijos pr. 20A, LT-09321 Vilnius';

  applicationForm: FormGroup;
  showConfirmation: boolean = false;

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private router: Router) {
    this.applicationForm = this.fb.group({
      makes: ['', Validators.required],
      models: ['', Validators.required],
      yearOfManufacture: ['', Validators.required],
      costOfTheVehicle: ['', [Validators.required, Validators.min(1), Validators.max(1000000)]],
      leasingPeriod: ['', Validators.required],
      downPayment: ['', [Validators.required, Validators.min(1), Validators.max(1000000)]],
      sellerName: ['', Validators.required],
      education: ['', Validators.required],
      positionHeld: ['', Validators.required],
      jobTitle: ['', Validators.required],
      timeEmployed: ['', Validators.required],
      businessAreaOfYourEmployer: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      numberOfChildren: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      monthlyIncomeAfterTaxes: ['', [Validators.required, Validators.min(1), Validators.max(1000000)]],
      obligations: ['', [Validators.required]],
      customerLoansOutstanding: ['', [Validators.min(1), Validators.max(1000000)]],
      customerLoansMonthlyPayment: ['', [Validators.min(1), Validators.max(1000000)]],
      carLeaseOutstanding: ['', [Validators.min(1), Validators.max(1000000)]],
      carLeaseMonthlyPayment: ['', [Validators.min(1), Validators.max(1000000)]],
      creditCardOutstanding: ['', [Validators.min(1), Validators.max(1000000)]],
      creditCardMonthlyPayment: ['', [Validators.min(1), Validators.max(1000000)]],
      mortgageOutstanding: ['', [Validators.min(1), Validators.max(1000000)]],
      mortgageMonthlyPayment: ['', [Validators.min(1), Validators.max(1000000)]],
      otherCreditsOutstanding: ['', [Validators.min(1), Validators.max(1000000)]],
      otherCreditsMonthlyPayment: ['', [Validators.min(1), Validators.max(1000000)]],
    });

    this.subscribeToFormControlChanges(
      'customerLoansOutstanding',
      'customerLoansMonthlyPayment'
    );
    this.subscribeToFormControlChanges(
      'carLeaseOutstanding',
      'carLeaseMonthlyPayment'
    );
    this.subscribeToFormControlChanges(
      'creditCardOutstanding',
      'creditCardMonthlyPayment'
    );
    this.subscribeToFormControlChanges(
      'mortgageOutstanding',
      'mortgageMonthlyPayment'
    );
    this.subscribeToFormControlChanges(
      'otherCreditsOutstanding',
      'otherCreditsMonthlyPayment'
    );
  }

  private subscribeToFormControlChanges(
    outstandingControlName: string,
    monthlyPaymentControlName: string
  ): void {
    this.applicationForm
      .get(outstandingControlName)
      ?.valueChanges.subscribe((value) => {
        const monthlyPaymentControl = this.applicationForm.get(
          monthlyPaymentControlName
        );
        if (monthlyPaymentControl) {
          if (value) {
            this.setValidators(monthlyPaymentControl, [
              Validators.required,
              Validators.min(1),
              Validators.max(1000000),
            ]);
          } else {
            this.setValidators(monthlyPaymentControl, null);
            monthlyPaymentControl.setValue(null);
          }
        }
      });
  }

  sectionValidator(controlNames: string[]): boolean {
    return controlNames.every((controlName) => {
      const control = this.applicationForm.get(controlName);
      return control ? control.valid : false;
    });
  }

  onSubmit(): void {
    const { costOfTheVehicle, downPayment, leasingPeriod } =
      this.applicationForm.getRawValue();
    const calcObj = initialCalculation(
      costOfTheVehicle,
      downPayment,
      +leasingPeriod
    );

    const formAfterCalculation = {
      ...this.applicationForm.getRawValue(),
      ...calcObj,
    };

    // const serializedForm = JSON.stringify(formAfterCalculation);
    // console.log('Submitting lease form to server...');
    //
    // this.leaseService.submit(serializedForm).subscribe(() => {
    //   console.log('Lease form has been submitted.');

    console.log('Simulating form submission to server:', formAfterCalculation);

      setTimeout(() => {
        console.log('Simulated server response: Lease form has been submitted.');

        this.showConfirmation = true;
        setTimeout(() => {
          this.router.navigate(['/submission-confirmation']);
        });
      });
  }





  onMakeSelect(event: any) {
    const make = event.target.value;
    if (make) {
      this.selectedMake =
        this.carData.car_makes.find((car) => car.make === make) || null;
    }
  }

  onMakeStudentSelect(event: any) {
    const jobTitleControl = this.applicationForm.get('jobTitle');
    const timeEmployedControl = this.applicationForm.get('timeEmployed');
    const businessAreaControl = this.applicationForm.get(
      'businessAreaOfYourEmployer'
    );

    if (event.target.value === 'student') {
      this.hideInputs('.jobTitleInput');
      this.setValidators(jobTitleControl, null);
      this.setValidators(timeEmployedControl, null);
      this.setValidators(businessAreaControl, null);
    } else {
      this.showInputs('.jobTitleInput');
      this.setValidators(jobTitleControl, [Validators.required]);
      this.setValidators(timeEmployedControl, [Validators.required]);
      this.setValidators(businessAreaControl, [Validators.required]);
    }
  }

  private hideInputs(selector: string): void {
    const inputs = document.querySelectorAll(
      selector
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => (input.style.display = 'none'));
  }

  private showInputs(selector: string): void {
    const inputs = document.querySelectorAll(
      selector
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => (input.style.display = ''));
  }

  private setValidators(
    control: AbstractControl | null,
    validators: any
  ): void {
    if (control) {
      control.setValidators(validators);
      control.updateValueAndValidity();
    }
  }

  handleObligationsChange(event: any) {
    const obligationsChange = document.getElementById(
      'table'
    ) as HTMLInputElement;

    if (event.target.value === 'Yes') {
      obligationsChange.style.display = '';
    } else {
      obligationsChange.style.display = 'none';
    }
  }

  navigateToStep(stepNumber: number): void {
    this.activeSteps.forEach((stepElement: ElementRef) => {
      const nativeElement = stepElement.nativeElement as HTMLElement;
      const stepAttribute = parseInt(
        nativeElement.getAttribute('step') || '0',
        10
      );

      if (stepNumber === stepAttribute) {
        nativeElement.classList.add('current');
        nativeElement.classList.remove('active');
      } else if (stepNumber > stepAttribute) {
        nativeElement.classList.remove('current');
        nativeElement.classList.add('active');
      } else {
        nativeElement.classList.remove('active');
        nativeElement.classList.remove('current');
      }
    });

    this.activeStepsSection.forEach((stepElement: ElementRef) => {
      const nativeElement = stepElement.nativeElement as HTMLElement;
      const stepAttribute = parseInt(
        nativeElement.getAttribute('step') || '0',
        10
      );
      if (stepNumber === stepAttribute) {
        nativeElement.classList.remove('d-none');
      } else {
        nativeElement.classList.add('d-none');
      }
    });
  }

  getCurrentDate() {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'yyyy-MM-dd');
  }
}
