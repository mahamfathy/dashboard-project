import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { openDB } from 'idb';
import { AngularMaterialModule } from '../../shared/modules/angular-material.module';
import { AuthService } from '../../shared/services/auth.service';
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
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  form = this.formBuilder.group(
    {
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['+1 2345 7891', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: [ValidationService.mustMatch('password', 'confirmPassword')] }
  );
  async saveUserData(formValue: any) {
    const db = openDB('user-data', 1, {
      upgrade(db) {
        db.createObjectStore('users', {
          keyPath: 'id',
          autoIncrement: true,
        });
      },
    });
    (await db).put('users', {
      userName: formValue.userName,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
    });
    console.log('User data saved to IndexedDB');
    console.log(db);
  }

  register() {
    const formValue = this.form.value;
    this.authService.signUp(formValue.email!, formValue.password!).subscribe(
      (res) => {
        console.log(res);
        this.saveUserData(formValue);
      },
      (err) => {
        console.error('Firebase Auth error:', err);
      }
    );

    this.form.reset();
  }
}
