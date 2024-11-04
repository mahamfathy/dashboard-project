import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from './validation.service';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private formBuilder: FormBuilder) {}
  createRegisterForm(): any {
    return this.formBuilder.group(
      {
        userName: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            ValidationService.emailDomain(['gmail.com', 'yahoo.com']),
          ],
        ],
        phoneNumber: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: [
          ValidationService.mustMatch('password', 'confirmPassword'),
        ],
      }
    );
  }

  createLoginForm(): any {
    return this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          ValidationService.emailDomain(['gmail.com', 'yahoo.com']),
        ],
      ],
      password: ['', Validators.required],
    });
  }
  createEmployeeModalForm(): any {
    return this.formBuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }
  createProfileForm(): FormGroup {
    return this.formBuilder.group({
      username: [''],
      firstName: [''],
      lastName: [''],
      address: [''],
      city: [''],
      country: [''],
      postalCode: [''],
      aboutMe: [''],
      company: [''],
      email: [{ value: '', disabled: true }],
    });
  }
}
