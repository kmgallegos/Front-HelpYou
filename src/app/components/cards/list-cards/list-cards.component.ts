import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { card } from '../../../models/card';
import { CardService } from '../../../services/card.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, NgIf } from '@angular/common';
import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-list-cards',
  standalone: true,
  imports: [MatTableModule, 
    MatCardModule, 
    CommonModule, 
    MatPaginator, 
    MatPaginatorModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,NgIf
],
  templateUrl: './list-cards.component.html',
  styleUrl: './list-cards.component.css'
})
export class ListCardsComponent implements OnInit,AfterViewInit {
  dataSource: MatTableDataSource<card>=new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sS: CardService, private aPP: AppComponent){}
  ngOnInit(): void {
    this.sS.list().subscribe((data)=>{ //agrega los datos en el data source
      this.dataSource = new MatTableDataSource(this.sortSchedules(data));
    })
    this.sS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(this.sortSchedules(data))
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sS.eliminar(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(this.sortSchedules(data));
      });
    });
  }

  sortSchedules(horariosss: card[]): card[] {
    return horariosss.sort((a, b) => a.idCard - b.idCard);
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
