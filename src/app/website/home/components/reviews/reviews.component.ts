import { Component, OnInit, ElementRef } from '@angular/core';

import { faAngleLeft, faAngleRight, faCircle as solidCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as regularCircle } from '@fortawesome/free-regular-svg-icons';
import { ReviewsService } from './services/reviews.service';
import { Observable } from 'rxjs';
import { IReview } from './models/iReview.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  actualPage = 1;
  tempWhidthPage = 0;
  totalPages = 6;
  activeIndicator = false;
  reviewsService$: Observable<IReview[]>;

  icons = {
    faAngleLeft,
    faAngleRight,
    solidCircle,
    regularCircle
  };

  constructor(
    private element: ElementRef,
    private reviewsService: ReviewsService
  ) {
    this.reviewsService$ = this.reviewsService.getReviews();
   }

  ngOnInit() {
  }

  nextPage() {
    const reviewsBox = this.element.nativeElement.querySelector('.app-reviews-list');
    const widthPage = reviewsBox.clientWidth;
    if (this.actualPage < this.totalPages) {
      this.actualPage === 1 ? this.tempWhidthPage = widthPage : this.tempWhidthPage += widthPage;
      reviewsBox.scroll((this.tempWhidthPage), 0);
      this.actualPage++;
    }
  }

  prevPage() {
    const reviewsBox = this.element.nativeElement.querySelector('.app-reviews-list');
    const widthPage = reviewsBox.clientWidth;
    if (this.actualPage > 1) {
      this.tempWhidthPage -= widthPage;
      reviewsBox.scroll((this.tempWhidthPage), 0);
      this.actualPage--;
    }
  }

  goToPage(page: number) {
    const reviewsBox = this.element.nativeElement.querySelector('.app-reviews-list');
    const widthPage = reviewsBox.clientWidth;
    reviewsBox.scroll((widthPage * page), 0);
    this.actualPage = page + 1;
    this.tempWhidthPage = widthPage * page;
  }
}
