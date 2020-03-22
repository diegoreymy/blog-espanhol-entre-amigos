import { Component, OnInit, Input } from '@angular/core';
import { IPost } from '../../models/IPost.model';

@Component({
  selector: 'app-post-card-list',
  templateUrl: './post-card-list.component.html',
  styleUrls: ['./post-card-list.component.scss']
})
export class PostCardListComponent implements OnInit {

  @Input() posts: IPost[];

  constructor() { }

  ngOnInit() {
  }

}
