import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { InvoiceService } from '../../../services/invoice.service';
import { Invoice } from '../../../models/invoice';

@Component({
  selector: 'app-list-invoice',
  standalone: true,
  imports: [MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    CommonModule],
  templateUrl: './list-invoice.component.html',
  styleUrl: './list-invoice.component.css'
})
export class ListInvoiceComponent implements OnInit{

  dataSource: MatTableDataSource<Invoice> = new MatTableDataSource();
  displayedColumns: string[] = [
    'Id',
    'dateInvoice',
    'totalInvoice',
    'idusers',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private sS: InvoiceService) {}

  ngOnInit(): void {


    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      
    });
  }

}
