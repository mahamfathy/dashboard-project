import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../shared/modules/angular-material.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AngularMaterialModule, SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {}
