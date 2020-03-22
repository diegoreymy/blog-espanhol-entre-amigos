import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IPostDetail } from '../../models/iPostDetail.model';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  postDetail$: Observable<IPostDetail[]>;
  slug: string;
  id: number;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.slug = params.slug);
    this.postDetail$ = this.blogService.getPostDetails(this.slug);
   }

  ngOnInit() {
  }

}
