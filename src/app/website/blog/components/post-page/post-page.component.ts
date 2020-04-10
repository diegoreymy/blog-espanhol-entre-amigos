import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IPosts } from '../../models/iPosts.model';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  postDetail$: Observable<IPosts>;
  slug: string;
  id: string;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.postDetail$ = this.blogService.getPostDetails(this.id);
  }
  
  ngOnInit() {
  }

}
