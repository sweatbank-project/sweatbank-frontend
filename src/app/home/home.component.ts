import { CarData, CarModel, carData } from './data';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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
