import { Component } from '@angular/core';
import { DashboardOverviewComponent } from '../../../secure/dashboard-overview/dashboard-overview.component';
import { NavigationService } from '../../services/navigation.service';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [DashboardOverviewComponent, SharedModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  constructor(private navigationService: NavigationService) {}
  navigateToHome(): void {
    this.navigationService.navigateToHome();
  }
}
