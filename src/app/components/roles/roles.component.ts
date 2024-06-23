import { Component, OnInit } from '@angular/core';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [ListRolesComponent,RouterOutlet],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}

}
