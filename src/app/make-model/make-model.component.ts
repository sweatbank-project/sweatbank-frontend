import { CarData, CarModel, carData } from './data';
import { Component } from '@angular/core';

@Component({
  selector: 'app-make-model',
  standalone: true,
  imports: [],
  templateUrl: './make-model.component.html',
  styleUrl: './make-model.component.scss',
})
export class MakeModelComponent {
  carData: CarData = carData;

  selectedMake: CarModel | null = null;

  onMakeSelect(event: any) {
    const make = event.target.value;
    if (make) {
      this.selectedMake =
        this.carData.car_makes.find((car) => car.make === make) || null;
    }
  }
}
