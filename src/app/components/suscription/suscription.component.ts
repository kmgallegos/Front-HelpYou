import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListSuscriptionComponent } from './list-suscription/list-suscription.component';

@Component({
  selector: 'app-suscription',
  standalone: true,
  imports: [ListSuscriptionComponent,RouterOutlet],
  templateUrl: './suscription.component.html',
  styleUrl: './suscription.component.css'
})
export class SuscriptionComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}

}
