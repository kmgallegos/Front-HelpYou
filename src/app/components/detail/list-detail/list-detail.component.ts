import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Detail } from '../../../models/detail';
import { DetailService } from '../../../services/detail.service';

@Component({
  selector: 'app-list-detail',
  standalone: true,
  imports: [MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './list-detail.component.html',
  styleUrl: './list-detail.component.css'
})
export class ListDetailComponent implements OnInit{

  dataSource: MatTableDataSource<Detail> = new MatTableDataSource();
  displayedColumns: string[] = [
    'Id',
    'SubTotal',
    'Cantidad',
    'InvoiceID',
    'SubscripcionID',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private sS:DetailService){}
  
  ngOnInit(): void {
    console.log(50);
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
      this.dataSource.paginator = this.paginator;
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
