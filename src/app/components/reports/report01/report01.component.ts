import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UserrService } from '../../../services/userr.service';

@Component({
  selector: 'app-report01',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report01.component.html',
  styleUrl: './report01.component.css'
})
export class Report01Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UserrService) {}

  ngOnInit(): void {
    this.uS.getCommentsByUser().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.username);
      this.barChartData = [
        {
          data: data.map((item) => item.quantityComments),
          label: 'Cantidad de comentarios por usuario',
          backgroundColor: ['#ffc56f', '#70e791', '#d586fb'],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
