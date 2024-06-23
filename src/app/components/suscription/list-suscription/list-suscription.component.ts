import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SuscriptionService } from '../../../services/suscription.service';
import { Suscription } from '../../../models/suscription';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from '../../../app.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-list-suscription',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,NgIf
  ],
  templateUrl: './list-suscription.component.html',
  styleUrls: ['./list-suscription.component.css']
})
export class ListSuscriptionComponent implements OnInit {

  dataSource: MatTableDataSource<Suscription> = new MatTableDataSource();
  displayedColumns: string[] = [
    'IdSuscription',
    'DataInicio',
    'DataFin',
    'Tipo',
    'Estado',
    'Precio',
    'idusers',
    'idservice',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sS: SuscriptionService, private router: Router, private aPP:AppComponent) {}

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

  edit(id: number): void {
    this.router.navigate(['/suscriptions/ediciones', id]); 
  }

  delete(id: number): void {
    this.sS.eliminar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(s => s.idSubscription !== id);
    });
  }

  isADMIN(): boolean {
    return this.aPP.isAdmin();
  }
  isMOD(): boolean {
    return this.aPP.isMod();
  }
  isCLIENT(): boolean {
    return this.aPP.isClient();
  }
}
