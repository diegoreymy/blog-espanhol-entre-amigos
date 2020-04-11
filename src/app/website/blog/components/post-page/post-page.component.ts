import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IPostDetail } from '../../models/IPostDetail.model';
import { IPosts } from '../../models/IPosts.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  postDetail$: Observable<IPostDetail>;
  slug: string;
  id: string;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {
    this.route.fragment.subscribe( fragment => {
      if (fragment !== null) {
        this.id = fragment;
        this.postDetail$ = this.blogService.getPostDetails(this.id);
      } else {
        this.slug = this.route.snapshot.paramMap.get('slug');
        this.blogService.getPosts().
        subscribe((posts: IPosts[]) => {
          posts.map((post: IPosts) => {
            if ( post.slug === this.slug ) {
              this.id = String(post.id);
              this.postDetail$ = this.blogService.getPostDetails(this.id);
            }
          });
        });
      }
    });
  }

  ngOnInit() {
  }

}
