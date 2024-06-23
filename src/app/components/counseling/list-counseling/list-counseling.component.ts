import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CounselingService } from '../../../services/counseling.service';
import { Counseling } from '../../../models/counseling';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-list-counseling',
  standalone: true,
  imports: [
    CommonModule, // Asegurarse de importar CommonModule
    MatButtonModule, 
    MatTableModule, 
    MatFormFieldModule, 
    RouterLink, 
    MatPaginatorModule, 
    MatInputModule, 
    MatIconModule
  ],
  templateUrl: './list-counseling.component.html',
  styleUrls: ['./list-counseling.component.css']
})
export class ListCounselingComponent implements OnInit {
  dataSource: MatTableDataSource<Counseling> = new MatTableDataSource();
  displayedColumns: string[] = ['idCounseling', 'meetingDateCounseling', 'meetingTimeCounseling', 'commentCounseling', 'user', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private counselingService: CounselingService) {}

  ngOnInit(): void {
    this.counselingService.list().subscribe((data) => {
      data.forEach(counseling => {
        counseling.meetingDateCounseling = new Date(counseling.meetingDateCounseling);
      });
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.counselingService.getList().subscribe((data) => {
      data.forEach(counseling => {
        counseling.meetingDateCounseling = new Date(counseling.meetingDateCounseling);
      });
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.counselingService.delete(id).subscribe(() => {
      this.counselingService.list().subscribe((data) => {
        data.forEach(counseling => {
          counseling.meetingDateCounseling = new Date(counseling.meetingDateCounseling);
        });
        this.dataSource.data = data;
      });
    });
  }
}
