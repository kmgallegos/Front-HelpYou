import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Service } from '../../../models/service';
import { ServiceService } from '../../../services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-service',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {

  dataSource: MatTableDataSource<Service> = new MatTableDataSource();
  displayedColumns: string[] = [
    'Id',
    'idusers',
    'Valoracion',
    'Direccion',
    'estado',
    'demanda',
    'descripcion',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sS: ServiceService) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.sS.eliminar(id).subscribe({
      next: () => {
        this.sS.list().subscribe((data) => {
          this.dataSource.data = data;
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El servicio ha sido eliminado correctamente.'
          });
        });
      },
      error: (err) => {
        if (err.status === 409) { // 409 Conflict
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se puede eliminar el servicio porque tiene suscripciones asociadas.'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error inesperado.'
          });
        }
      }
    });
  }
}
