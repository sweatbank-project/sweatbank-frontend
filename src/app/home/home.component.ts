import { CarData, CarModel, carData } from './data';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChildren('activeStep') activeSteps!: QueryList<ElementRef>;
  @ViewChildren('activeStepSection') activeStepsSection!: QueryList<ElementRef>;

  carData: CarData = carData;
  selectedMake: CarModel | null = null;

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
