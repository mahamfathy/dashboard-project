import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dashboard-project';
}
