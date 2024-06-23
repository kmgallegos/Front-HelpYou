import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-report07',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report07.component.html',
  styleUrl: './report07.component.css'
})
export class Report07Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
 //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private sS: NotificationService) {}
  ngOnInit(): void {
    this.sS.getNotificationsPerUserDTO().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.status);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad de suscripciones ',
          backgroundColor: ['#ffc56f', '#70e791', '#d586fb'],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}