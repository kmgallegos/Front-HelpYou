import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { UserrService } from '../../../services/userr.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-report02',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report02.component.html',
  styleUrl: './report02.component.css'
})
export class Report02Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UserrService) {}

  ngOnInit(): void {
    this.uS.getUsersBySubscription().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.subscriptionType);
      this.barChartData = [
        {
          data: data.map((item) => item.quantityUser),
          label: 'Cantidad de usuarios por suscripción',
          backgroundColor: ['#ffc56f', '#70e791', '#d586fb'],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}

