import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post';
import { ForumService } from '../../../services/forum.service';
import { Forum } from '../../../models/forum';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;
  post: Post = new Post();
  forumsList: Forum[] = [];

  constructor(
    private postService: PostService,
    private forumService: ForumService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idPost: [''],
      namePost: ['', Validators.required],
      queryDescription: ['', Validators.required],
      datePost: ['', Validators.required],
      forum: ['', Validators.required]
    });

    this.forumService.list().subscribe((data) => {
      this.forumsList = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.post.idPost = this.form.value.idPost;
      this.post.namePost = this.form.value.namePost;
      this.post.queryDescription = this.form.value.queryDescription;
      this.post.datePost = this.form.value.datePost;
      this.post.forum = { idForum: this.form.value.forum } as Forum;

      if (this.edicion) {
        this.postService.update(this.post).subscribe(() => {
          this.postService.list().subscribe((data) => {
            this.postService.setList(data);
          });
          this.router.navigate(['posts']);
        });
      } else {
        this.postService.insert(this.post).subscribe(() => {
          this.postService.list().subscribe((data) => {
            this.postService.setList(data);
          });
          this.router.navigate(['posts']);
        });
      }
    }
  }

  init(): void {
    if (this.edicion) {
      this.postService.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          idPost: data.idPost,
          namePost: data.namePost,
          queryDescription: data.queryDescription,
          datePost: data.datePost,
          forum: data.forum.idForum
        });
      });
    }
  }
}
