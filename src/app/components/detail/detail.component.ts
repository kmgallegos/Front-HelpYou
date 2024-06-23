import { Component, OnInit } from '@angular/core';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ListDetailComponent, RouterOutlet],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
    
  }

}
