import {
  CarData,
  CarModel,
  carData
} from './data';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChildren('activeStep') activeSteps!: QueryList<ElementRef>;
  @ViewChildren('activeStepSection') activeStepsSection!: QueryList<ElementRef>;

  carData: CarData = carData;
  selectedMake: CarModel | null = null;


  applicationForm = new FormGroup({
    makes: new FormControl('', [Validators.required]),
    models: new FormControl('', [Validators.required]),
    yearOfManufacture: new FormControl('', [Validators.required]),
    costOfTheVehicle: new FormControl('', [Validators.required, Validators.min(1)]),
    leasingPeriod: new FormControl('', [Validators.required]),
    downPayment: new FormControl('', [Validators.required, Validators.min(1)]),
    sellerName: new FormControl('', [Validators.required]),
    education: new FormControl('', [Validators.required]),
    positionHeld: new FormControl('', [Validators.required]),
    jobTitle: new FormControl('', [Validators.required]),
  });

  section1Validator(): boolean {
    const makesControl = this.applicationForm.get('makes');
    const modelsControl = this.applicationForm.get('models');
    const yearOfManufactureControl = this.applicationForm.get('yearOfManufacture');
    const costOfTheVehicleControl = this.applicationForm.get('costOfTheVehicle');
    const leasingPeriodControl = this.applicationForm.get('leasingPeriod');
    const downPaymentControl = this.applicationForm.get('downPayment');
    const sellerNameControl = this.applicationForm.get('sellerName');

    if (makesControl && modelsControl && yearOfManufactureControl &&
      costOfTheVehicleControl && leasingPeriodControl && downPaymentControl &&
      sellerNameControl) {
      return makesControl.valid && modelsControl.valid &&
        yearOfManufactureControl.valid && costOfTheVehicleControl.valid &&
        leasingPeriodControl.valid && downPaymentControl.valid &&
        sellerNameControl.valid;
    }

    return false;
  }





  onSubmit(): void {
    console.log(this.applicationForm.value);
  }








  onMakeSelect(event: any) {
    const make = event.target.value;
    if (make) {
      this.selectedMake =
        this.carData.car_makes.find((car) => car.make === make) || null;
    }
  }

  onMakeStudentSelect(event: any) {
    const jobTitleInputs = document.querySelectorAll('.jobTitleInput') as NodeListOf<HTMLInputElement>;
    jobTitleInputs.forEach((input: HTMLInputElement) => {
      if (event.target.value === 'student') {
        input.style.display = 'none';
      } else {
        input.style.display = '';
      }
    });
  }

  handleObligationsChange(event: any) {
    const obligationsChange = document.getElementById('table') as HTMLInputElement;

    if (event.target.value === 'Yes') {
      obligationsChange.style.display = '';
    } else {
      obligationsChange.style.display = 'none';
    }
  }

  navigateToStep(stepNumber: number): void {
    this.activeSteps.forEach((stepElement: ElementRef) => {
      const nativeElement = stepElement.nativeElement as HTMLElement;
      const stepAttribute = parseInt(nativeElement.getAttribute('step') || '0', 10);

      if (stepNumber === stepAttribute) {
        console.log(nativeElement);
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
      const stepAttribute = parseInt(nativeElement.getAttribute('step') || '0', 10);
      if (stepNumber === stepAttribute) {
        nativeElement.classList.remove('d-none');
      } else {
        nativeElement.classList.add('d-none');
      }
    });
  }
}
