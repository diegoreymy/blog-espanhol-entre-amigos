import { Component, Input } from '@angular/core';
import { IPost } from '../../models/IPost.model';

@Component({
  selector: 'app-post-card-list',
  templateUrl: './post-card-list.component.html',
  styleUrls: ['./post-card-list.component.scss']
})
export class PostCardListComponent {

  @Input() posts: IPost[];

}
