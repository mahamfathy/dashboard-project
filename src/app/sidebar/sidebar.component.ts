import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { LanguageService } from '../shared/services/language.service';
import { NavigationService } from '../shared/services/navigation.service';
import { SharedModule } from '../shared/shared.module';
declare const bootstrap: any;
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements AfterViewInit {
  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}
  profileName = 'ABC';
  readonly arabic = 'ar';
  readonly english = 'en';
  selectedLanguage!: string;
  ngAfterViewInit(): void {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  changeLanguage(lang: string): void {
    this.languageService.changeLanguage(lang);
  }
  logout(): void {
    this.authService.signOut();
    this.navigationService.navigateByUrl('/account/login');
  }
}
