import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPosts } from '../../models/IPosts.model';
import { BlogService } from '../../services/blog.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts$: Observable<IPosts[]>;

  constructor(
    private blogService: BlogService,
    private metaService: Meta
  ) {
    this.posts$ = this.blogService.getPosts();
   }

  ngOnInit() {
    this.metaService.addTags([
      {name: 'keywords', content: 'Español, Espanhol, Blog'},
      {name: 'description', content: 'Blog de artigos relacionados ao ensino de espanhol para brasileiros'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }

}
