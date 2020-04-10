import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPosts } from '../../models/IPosts.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts$: Observable<IPosts[]>;

  constructor(
    private blogService: BlogService
  ) {
    this.posts$ = this.blogService.getPosts();
   }

  ngOnInit() {
  }

}
