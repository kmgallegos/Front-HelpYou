import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListServiceComponent } from './list-service/list-service.component';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [ListServiceComponent,RouterOutlet],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent  implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {}

}
