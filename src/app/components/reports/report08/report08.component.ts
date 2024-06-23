import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SuscriptionService } from '../../../services/suscription.service';

@Component({
  selector: 'app-report08',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report08.component.html',
  styleUrl: './report08.component.css'
})
export class Report08Component implements OnInit {
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

  constructor(private sS: SuscriptionService) {}
  ngOnInit(): void {
    this.sS.getSubscriptionIncomeDTO().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.estadoSuscripcion);
      this.barChartData = [
        {
          data: data.map((item) => item.ingresosGenerados),
          label: 'Ingresos generados ',
          backgroundColor: ['#ffc56f', '#70e791', '#d586fb'],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}