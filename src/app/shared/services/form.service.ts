import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './validation.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private formBuilder: FormBuilder) {}
  createRegisterForm(): any {
    return this.formBuilder.group(
      {
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['+1 2345 7891', Validators.required],
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

  login(): any {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
