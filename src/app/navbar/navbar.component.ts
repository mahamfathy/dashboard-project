import { Component } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
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
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService
  ) {}
  logout(): void {
    this.localStorageService.removeItem('token');
    this.navigationService.navigateByUrl('account/login');
  }
}
