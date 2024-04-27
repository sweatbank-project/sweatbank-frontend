import { AbstractControl, ValidatorFn } from '@angular/forms';

export function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value) {
      const currentDate = new Date();
      const selectedDate = new Date(control.value);
      
      const age = currentDate.getFullYear() - selectedDate.getFullYear();

      if (age < 18) {
        return { 'invalidBirthDate': 'You must be at least 18 years old' };
      } else if (age > 100) {
        return { 'invalidBirthDate': 'Please enter a valid birth date' };
      }
    }
    return null;
  };
}
