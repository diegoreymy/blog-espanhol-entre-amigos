import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { IPostDetail } from '../../models/IPostDetail.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit {

  @Input() post: IPostDetail;

  constructor() {}

  ngOnInit() {
  }

}
