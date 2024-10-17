import {} from '@angular/common/http';
import { Component } from '@angular/core';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { FirebaseService } from './shared/services/firebase.service';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeLayoutComponent, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [FirebaseService],
})
export class AppComponent {
  title = 'dashboard-project';
}
