
import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-roles',
  standalone: true,
  imports: [MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './list-roles.component.html',
  styleUrl: './list-roles.component.css'
})
export class ListRolesComponent implements OnInit {

  dataSource: MatTableDataSource<role> = new MatTableDataSource();
  displayedColumns: string[] = [
    'IdRole',
    'tipo',
    'descripcion',
    'idusers',
    'accion01',
    'accion02'
    
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sS: RoleService) {}
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
