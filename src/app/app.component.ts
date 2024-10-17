import {} from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { LanguageService } from './shared/services/language.service';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeLayoutComponent, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'dashboard-project';
  langaugeService = inject(LanguageService);
  ngOnInit(): void {
    this.initAppLanguage();
  }
  private initAppLanguage(): void {
    this.langaugeService.initAppLanguage();
  }
}
