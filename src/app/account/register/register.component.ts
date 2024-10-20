import { Component } from '@angular/core';
import { openDB } from 'idb';
import { AuthService } from '../../shared/services/auth.service';
import { FormService } from '../../shared/services/form.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private formService: FormService,
    private authService: AuthService
  ) {}
  form = this.formService.createRegisterForm();
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
