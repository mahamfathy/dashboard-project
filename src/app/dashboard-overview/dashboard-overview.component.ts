import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';
import { MainGraphComponent } from './graphs/main-graph/main-graph.component';
import { PieGraphComponent } from './graphs/pie-graph/pie-graph.component';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CardComponent, MainGraphComponent, PieGraphComponent],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.scss',
})
export class DashboardOverviewComponent {}
