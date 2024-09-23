import { Component } from '@angular/core';
import { CardsComponent } from './cards/cards.component';
import { GraphComponent } from './graph/graph.component';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CardsComponent, GraphComponent],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.scss',
})
export class DashboardOverviewComponent {}
