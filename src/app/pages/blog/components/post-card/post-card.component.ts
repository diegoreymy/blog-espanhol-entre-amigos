import { Component, Input, OnChanges } from '@angular/core';
import { IPost } from '../../models/IPost.model';
import { IPostImages } from '../../models/IPostImages.model';

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.scss'],
    standalone: false
})
export class PostCardComponent implements OnChanges {

  @Input() post: IPost;
  imagesPost: IPostImages;

  ngOnChanges() {
    if (this.post) {
      this.imagesPost = JSON.parse(this.post.excerpt.rendered.split('<pre>')[1].replace('</pre>', '').trim());
    }
  }
}
