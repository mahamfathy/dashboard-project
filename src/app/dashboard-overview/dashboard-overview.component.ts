import { Component } from '@angular/core';
import { CardsComponent } from './cards/cards.component';
import { MainGraphComponent } from './graphs/main-graph.component';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CardsComponent, MainGraphComponent],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.scss',
})
export class DashboardOverviewComponent {}
