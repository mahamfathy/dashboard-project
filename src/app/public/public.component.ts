import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
})
export class PublicComponent {}
