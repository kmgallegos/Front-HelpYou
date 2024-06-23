import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SuscriptionService } from '../../../services/suscription.service';

@Component({
  selector: 'app-report03',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report03.component.html',
  styleUrl: './report03.component.css'
})
export class Report03Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
 //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private sS: SuscriptionService) {}
  ngOnInit(): void {
    this.sS.getSubscriptionTypeDTO().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.statusSubscription);
      this.barChartData = [
        {
          data: data.map((item) => item.subscriptionCount),
          label: 'Cantidad de suscripciones ',
          backgroundColor: ['#ffc56f', '#70e791', '#d586fb'],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}

