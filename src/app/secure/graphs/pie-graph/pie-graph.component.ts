import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-pie-graph',
  standalone: true,
  imports: [],
  templateUrl: './pie-graph.component.html',
  styleUrl: './pie-graph.component.scss',
})
export class PieGraphComponent implements OnInit {
  data: any = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  };
  config = {
    type: 'pie',
    data: this.data,
  };
  chart: any;
  footerColor: string = '#666360';
  footerText: string = ' Number of emails sent';
  footerIcon: string =
    'M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z';

  ngOnInit(): void {
    this.chart = new Chart('PieChart', this.config);
  }
}
