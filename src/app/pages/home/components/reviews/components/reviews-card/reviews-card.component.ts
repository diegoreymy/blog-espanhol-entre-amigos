import { Component, Input, Output, EventEmitter } from '@angular/core';

import { faQuoteRight, faQuoteLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { IReview } from '../../models/iReview.model';

@Component({
    selector: 'app-reviews-card',
    templateUrl: './reviews-card.component.html',
    styleUrls: ['./reviews-card.component.scss'],
    standalone: false
})
export class ReviewsCardComponent {

  @Input() review: IReview;
  @Input() loadAll: boolean;
  @Input() seeMore = false;
  @Output() seeMoreId = new EventEmitter<number>();

  icons = {
    faQuoteRight,
    faQuoteLeft,
    faStar
  };

  openSeeMore() {
    this.seeMoreId.emit(this.review.id);
    this.seeMore = !this.seeMore;
  }
}
