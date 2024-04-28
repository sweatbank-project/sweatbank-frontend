import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value) {
        if (control.value.length < 6 ) {
            return { 'passwordLength': 'Password must be at least 6 characters long' };
        }
    }
    return null;
  };
}
