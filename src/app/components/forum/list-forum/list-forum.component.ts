import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ForumService } from '../../../services/forum.service';
import { Forum } from '../../../models/forum';
import { CommonModule, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-list-forum',
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
    RouterLink,NgIf],
  templateUrl: './list-forum.component.html',
  styleUrl: './list-forum.component.css'
})
export class ListForumComponent  implements OnInit,AfterViewInit{
  
 
    dataSource: MatTableDataSource<Forum>=new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sS: ForumService, private aPP: AppComponent){}
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

  sortSchedules(horariosss: Forum[]): Forum[] {
    return horariosss.sort((a, b) => a.idForum - b.idForum);
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
