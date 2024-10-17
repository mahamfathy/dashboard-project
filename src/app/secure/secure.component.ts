import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-secure',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './secure.component.html',
  styleUrl: './secure.component.scss',
})
export class SecureComponent {}
