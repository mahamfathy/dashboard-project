import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navigationService: NavigationService,
    private localStorageService: LocalStorageService
  ) {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  login(loginForm: FormGroup): any {
    if (loginForm.valid) {
      const formValue = this.loginForm.value;
      return this.authService
        .signIn(formValue.email!, formValue.password!)
        .subscribe((res) => {
          console.log(res.idToken);
          this.localStorageService.setItem('token', res.idToken);
          this.navigationService.navigateByUrl('/secure/dashboard');
        });
    }
  }
  navigateToRegister(): void {
    this.navigationService.navigateToRegister();
  }
}
