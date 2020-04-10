import { Component, OnInit, Input } from '@angular/core';
import { IPosts } from '../../models/IPosts.model';

@Component({
  selector: 'app-post-card-list',
  templateUrl: './post-card-list.component.html',
  styleUrls: ['./post-card-list.component.scss']
})
export class PostCardListComponent implements OnInit {

  @Input() posts: IPosts[];

  constructor() { }

  ngOnInit() {
  }

}
