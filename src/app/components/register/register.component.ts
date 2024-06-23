import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CrearUsuarioComponent, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
    
  }

}

