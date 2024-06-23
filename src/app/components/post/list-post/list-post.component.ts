import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [
    MatTableModule, 
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
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit,AfterViewInit {
  dataSource: MatTableDataSource<Post>=new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sS: PostService, private aPP: AppComponent){}
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
    this.sS.delete(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(this.sortSchedules(data));
      });
    });
  }

  sortSchedules(horariosss: Post[]): Post[] {
    return horariosss.sort((a, b) => a.idPost - b.idPost);
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
