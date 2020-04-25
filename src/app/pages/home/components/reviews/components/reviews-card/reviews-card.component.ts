import { Component, OnInit, Input, ElementRef } from '@angular/core';

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

  constructor(
    private document: ElementRef
  ) { }

  ngOnInit() {
  }

  openSeeMore() {
    const container = this.document.nativeElement.parentElement.parentElement.querySelector('p.see-more');
    if (container && !this.seeMore) {
      container.click();
    }
    this.seeMore = !this.seeMore;
  }
}