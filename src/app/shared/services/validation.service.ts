import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}
  static mustMatch(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
      if (!control || !matchingControl) return null;
      if (matchingControl.errors && !matchingControl.errors['mustMatch'])
        return null;
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }
  static emailDomain(domains: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (
        typeof email === 'string' &&
        !domains.some((domain) => email.endsWith(`@${domain}`))
      ) {
        return { emailDomain: true };
      }
      return null;
    };
  }
}
