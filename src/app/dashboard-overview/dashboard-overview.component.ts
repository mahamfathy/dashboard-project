import { Component } from '@angular/core';
import { CardsComponent } from './cards/cards.component';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.scss',
})
export class DashboardOverviewComponent {}
