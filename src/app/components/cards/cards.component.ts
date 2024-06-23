import { Component, OnInit } from '@angular/core';
import { ListRolesComponent } from '../roles/list-roles/list-roles.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListCardsComponent } from './list-cards/list-cards.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [ListCardsComponent,RouterOutlet],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}

}
