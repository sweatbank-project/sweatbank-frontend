import { calculateMonthlyPayment, calculateTotalInterestRate, initialCalculation } from './../../../core/utility';
import { CarData, CarModel, carData } from './data';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
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
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth.service";
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [ReactiveFormsModule, ModalModule, FontAwesomeModule],
  providers: [DatePipe],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
})
export class ApplicationComponent {
  @ViewChildren('activeStep') activeSteps!: QueryList<ElementRef>;
  @ViewChildren('activeStepSection') activeStepsSection!: QueryList<ElementRef>;
  @ViewChild(ModalDirective, { static: false }) modal?: ModalDirective;

  authService = inject(AuthService);

  private readonly leaseService: LeaseService = inject(LeaseService);
  private readonly router = inject(Router);
  private readonly datePipe = inject(DatePipe)

  carData: CarData = carData;
  selectedMake: CarModel | null = null;
  error: string | null = null;
  isLoading = false;

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faSpinner = faSpinner;

  phone = this.authService.getUserData('phoneNumber');
  email = this.authService.getUserData('username');
  address = this.authService.getUserData('address');
  monthlyPayment = 0;

  applicationForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    }, { validator: this.customValidator });

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

  customValidator(formGroup: FormGroup) {
    const costOfTheVehicleControl = formGroup.get('costOfTheVehicle');
    const downPaymentControl = formGroup.get('downPayment');

    if (costOfTheVehicleControl && downPaymentControl) {
      const costValue = costOfTheVehicleControl.value;
      const downPaymentValue = downPaymentControl.value;

      if (downPaymentValue && costValue && downPaymentValue > costValue) {
        downPaymentControl.setErrors({ downPaymentGreaterThanCost: 'asd' });
      } else {
        downPaymentControl.setErrors(null);
      }
    }
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
    this.isLoading = true;
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

    const serializedForm = JSON.stringify(formAfterCalculation);
    
    this.leaseService.submit(serializedForm).subscribe({
      next: () => {
        this.router.navigate(['/submission-confirmation']);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        if(error.error.errors.length > 0) {
          this.error = error.error.errors[0];
        }
      }
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
    if(stepNumber === 4) {
      this.monthlyPayment = initialCalculation(
        this.applicationForm.get('costOfTheVehicle')?.value,
        this.applicationForm.get('downPayment')?.value,
        this.applicationForm.get('leasingPeriod')?.value
      ).monthlyPayment;
    }

    this.activeSteps.forEach((stepElement: ElementRef) => {
      const nativeElement = stepElement.nativeElement as HTMLElement;
      const stepAttribute = parseInt(
        nativeElement.getAttribute('step') || '0',
        10
      );

      if (stepNumber === stepAttribute) {
        nativeElement.classList.add('current');
        nativeElement.classList.remove('done');
      } else if (stepNumber > stepAttribute) {
        nativeElement.classList.remove('current');
        nativeElement.classList.add('done');
      } else {
        nativeElement.classList.remove('done');
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

  goBackToHome(): void {
    this.router.navigate(['/home']);
  }

  getCurrentDate() {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'yyyy-MM-dd');
  }

  showModal() {
    this.modal?.show();
  }

  hideModal() {
    this.modal?.hide();
  }
}