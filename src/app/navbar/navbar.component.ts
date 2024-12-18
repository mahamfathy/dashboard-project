import { Component } from '@angular/core';
import { IProfile } from '../shared/models/IProfile';
import { AuthService } from '../shared/services/auth.service';
import { NavigationService } from '../shared/services/navigation.service';
import { NotificationService } from '../shared/services/notification.service';
import { SidebarService } from '../shared/services/sidebar.service';
import { ThemeService } from '../shared/services/theme.service';
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
  imagePath!: string;
  profile!: IProfile;

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService,
    public themeService: ThemeService,
    public notificationService: NotificationService,
    private sidebarService: SidebarService
  ) {
    this.authService.imagePath$.subscribe((imagePath) => {
      if (imagePath) this.imagePath = imagePath;
    });
    this.authService.profile$.subscribe((profile) => {
      this.profile = profile;
    });
  }
  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  logout(): void {
    this.authService.signOut();
    this.navigationService.navigateByUrl('/account/login');
  }
}
