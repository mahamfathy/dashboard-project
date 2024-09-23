import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent implements OnInit {
  public config: any = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Looping tension',
          data: [65, 59, 80, 81, 26, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
        },
      ],
    },
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true,
        },
      },
      scales: {
        y: {
          min: 0,
          max: 100,
        },
      },
    },
  };
  chart: any;
  constructor() {}
  ngOnInit(): void {
    this.chart = new Chart('MyChart', this.config);
  }
}
