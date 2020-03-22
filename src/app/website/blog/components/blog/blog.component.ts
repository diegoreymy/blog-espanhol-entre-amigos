import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../models/IPost.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts$: Observable<IPost[]>;

  constructor(
    private blogService: BlogService
  ) {
    this.posts$ = this.blogService.getPosts();
   }

  ngOnInit() {
  }

}
