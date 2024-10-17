import { CommonModule } from '@angular/common';
import {} from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { FirebaseService } from './shared/services/firebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeLayoutComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [FirebaseService],
})
export class AppComponent {
  title = 'dashboard-project';
}
