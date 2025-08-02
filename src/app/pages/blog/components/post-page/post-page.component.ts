// src/app/pages/blog/components/post-page/post-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Observable }        from 'rxjs';
import { map }               from 'rxjs/operators';
import { IPost }             from '../../models/IPost.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  standalone: false
})
export class PostPageComponent implements OnInit {
  postDetail$: Observable<IPost>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.postDetail$ = this.route.data.pipe(
      map(data => data.post as IPost)
    );
  }
}
