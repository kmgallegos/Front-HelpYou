import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListCounselingComponent } from './list-counseling/list-counseling.component';

@Component({
  selector: 'app-counseling',
  standalone: true,
  imports: [ListCounselingComponent, RouterOutlet],
  templateUrl: './counseling.component.html',
  styleUrls: ['./counseling.component.css']
})
export class CounselingComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
