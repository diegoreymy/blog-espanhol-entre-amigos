import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../models/IPost.model';

@Component({
    selector: 'app-post-page',
    templateUrl: './post-page.component.html',
    styleUrls: ['./post-page.component.scss'],
    standalone: false
})
export class PostPageComponent {
  postDetail: IPost | null;

  constructor(private route: ActivatedRoute) {
    this.postDetail = this.route.snapshot.data['post'] ?? null;
  }
}
