import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { NavigationService } from '../shared/services/navigation.service';
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
  unreadCount = 1;
  constructor(
    private navigationService: NavigationService,
    private authService: AuthService
  ) {}
  logout(): void {
    this.authService.signOut();
    this.navigationService.navigateByUrl('account/login');
  }
}
