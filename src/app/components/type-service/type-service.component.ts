import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListTypeComponent } from './list-type/list-type.component';

@Component({
  selector: 'app-type-service',
  standalone: true,
  imports: [RouterOutlet, ListTypeComponent],
  templateUrl: './type-service.component.html',
  styleUrl: './type-service.component.css'
})
export class TypeServiceComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }

}
