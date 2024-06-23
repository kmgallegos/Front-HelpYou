import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TypeServiceService } from '../../../services/type-service.service';
import { Type_service } from '../../../models/type_service';

@Component({
  selector: 'app-list-type',
  standalone: true,
  imports: [MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './list-type.component.html',
  styleUrl: './list-type.component.css'
})
export class ListTypeComponent implements OnInit{

  dataSource: MatTableDataSource<Type_service> = new MatTableDataSource();
  displayedColumns: string[] = [
    'IdTypeService',
    'descripcion',
    'idService',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sS: TypeServiceService) {}

  ngOnInit(): void {
   this.sS.list().subscribe((data)=>
    {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }) 

    this.sS.getList().subscribe((data) => 
    {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

}
