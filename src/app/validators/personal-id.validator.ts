import { AbstractControl, ValidatorFn } from '@angular/forms';

export function personalIdValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if(control.value) {
        if (control.value.length !== 11) {
            return { 'invalidPersonalIdLength': 'Personal ID must be 11 characters long' };
        }
    
        const personalIdRegex = /^\d{11}$/;
        if (!personalIdRegex.test(control.value)) {
          return { 'invalidPersonalIdFormat': 'Invalid personal ID format. It should consist of 11 digits' };
        }
    }

    return null;
  };
}