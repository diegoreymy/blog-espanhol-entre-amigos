import { Component, OnInit, Input } from '@angular/core';

import { faQuoteRight, faQuoteLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { IReview } from '../../models/iReview.model';

@Component({
  selector: 'app-reviews-card',
  templateUrl: './reviews-card.component.html',
  styleUrls: ['./reviews-card.component.scss']
})
export class ReviewsCardComponent implements OnInit {

  @Input() review: IReview;
  seeMore = false;

  icons = {
    faQuoteRight,
    faQuoteLeft,
    faStar
  };

  constructor() { }

  ngOnInit() {
    console.log(this.review);
  }

}
