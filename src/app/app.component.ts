import { } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { AuthService } from './shared/services/auth.service';
import { LanguageService } from './shared/services/language.service';
import { ThemeService } from './shared/services/theme.service';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeLayoutComponent, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  langaugeService = inject(LanguageService);
  themeService = inject(ThemeService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.initAppLanguage();
    const savedTheme = this.themeService.getTheme();
    console.log(`Retrieved theme: ${savedTheme}`);
    this.themeService.applyTheme(savedTheme);
    const username = this.authService.getUsername();
    if (username) this.authService.usernameSubject.next(username);

  }
  private initAppLanguage(): void {
    this.langaugeService.initAppLanguage();
  }
}
