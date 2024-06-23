import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListPostComponent } from './list-post/list-post.component';
import { ListCommentComponent } from '../comment/list-comment/list-comment.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterOutlet, ListPostComponent],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
