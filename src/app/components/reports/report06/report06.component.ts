import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CounselingService } from '../../../services/counseling.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-report06',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report06.component.html',
  styleUrl: './report06.component.css'
})
export class Report06Component implements OnInit {
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

  constructor(private sS: CounselingService) {}
  ngOnInit(): void {
    this.sS.getCounselingByUserDTO().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.usuario);
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