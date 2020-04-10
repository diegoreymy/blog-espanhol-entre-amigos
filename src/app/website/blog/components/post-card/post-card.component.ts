import { Component, OnInit, Input } from '@angular/core';
import { IPosts } from '../../models/IPosts.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: IPosts;

  constructor() { }

  ngOnInit() {
  }

}
