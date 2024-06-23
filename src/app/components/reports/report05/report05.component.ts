import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { UserrService } from '../../../services/userr.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-report05',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report05.component.html',
  styleUrl: './report05.component.css'
})
export class Report05Component implements OnInit {
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

  constructor(private sS: UserrService) {}
  ngOnInit(): void {
    this.sS.getUserByForumDTO().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.foro);
      this.barChartData = [
        {
          data: data.map((item) => item.usuarios),
          label: 'Cantidad de suscripciones ',
          backgroundColor: ['#ffc56f', '#70e791', '#d586fb'],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
