import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumberRegex = /^86\d{7}$/;
    if (!phoneNumberRegex.test(control.value)) {
      return { 'invalidPhoneNumberFormat': 'Phone number must start with 86 and consist of 9 digits in total' };
    }

    return null;
  };
}
