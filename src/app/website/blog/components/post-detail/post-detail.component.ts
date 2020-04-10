import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { IPosts } from '../../models/IPosts.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit {

  @Input() post: IPosts;

  constructor() {}

  ngOnInit() {
  }

}
