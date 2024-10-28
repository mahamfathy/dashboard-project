import {} from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
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

  ngOnInit(): void {
    this.initAppLanguage();
    const savedTheme = this.themeService.getTheme();
    console.log(`Retrieved theme: ${savedTheme}`); // Debugging log

    this.themeService.applyTheme(savedTheme);
  }
  private initAppLanguage(): void {
    this.langaugeService.initAppLanguage();
  }
}
