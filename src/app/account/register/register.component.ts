import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularMaterialModule } from '../../shared/modules/angular-material.module';
import { ValidationService } from '../../shared/services/validation.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AngularMaterialModule, SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder) {}
  form = this.formBuilder.group(
    {
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: '+1 2345 7891',
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { Validators: ValidationService.mustMatch('password', 'confirmPassword') }
  );
}
