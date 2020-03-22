import { Component, OnInit, Input } from '@angular/core';
import { IPost } from '../../models/IPost.model';
import { IPostDetail } from '../../models/iPostDetail.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  @Input() post: IPostDetail;

  constructor() {}

  ngOnInit() {}

}
