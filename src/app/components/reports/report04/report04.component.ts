import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { RoleService } from '../../../services/role.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-report04',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report04.component.html',
  styleUrl: './report04.component.css'
})
export class Report04Component implements OnInit {
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

  constructor(private sS: RoleService) {}
  ngOnInit(): void {
    this.sS.getRoleTypeDTO().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.rol);
      this.barChartData = [
        {
          data: data.map((item) => item.rolCount),
          label: 'Cantidad de suscripciones ',
          backgroundColor: ['#ffc56f', '#70e791', '#0000CD'],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }}
