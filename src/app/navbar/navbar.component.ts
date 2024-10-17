import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  faBell = 'faBell';
}
