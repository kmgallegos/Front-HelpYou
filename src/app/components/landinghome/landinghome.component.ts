import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landinghome',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './landinghome.component.html',
  styleUrl: './landinghome.component.css'
})
export class LandinghomeComponent {

}
