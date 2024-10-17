import {} from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
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
  translateService = inject(TranslateService);
  ngOnInit(): void {
    this.translateService.setDefaultLang('ar');
  }
}
