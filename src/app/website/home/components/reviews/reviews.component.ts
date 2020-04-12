import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { faAngleLeft, faAngleRight, faCircle as solidCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as regularCircle } from '@fortawesome/free-regular-svg-icons';
import { ReviewsService } from './services/reviews.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { IReview } from './models/iReview.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {

  actualItem = 1;
  tempWhidthPage = 0;
  totalPages = 0;
  activeIndicator = false;
  reviewsService$: Observable<IReview[]>;
  subscriptions = new Subscription();
  reviews: IReview[] = [];
  size: number = window.innerWidth;
  totalPagesArray = [];

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
    this.subscriptions.add(this.reviewsService.getReviews().subscribe(reviews => {
      this.reviews = reviews;
      this.setTotalPages();
    }));
    this.subscriptions.add(fromEvent(window, 'resize').subscribe((event: Event) => {
      this.getPageWidth(event);
      this.setTotalPages();
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  nextPage() {
    const reviewsBox = this.element.nativeElement.querySelector('.app-reviews-list');
    const widthItem = reviewsBox.clientWidth;
    if (this.actualItem < this.totalPages) {
      this.actualItem === 1 ? this.tempWhidthPage = widthItem : this.tempWhidthPage += widthItem;
      reviewsBox.scroll((this.tempWhidthPage), 0);
      this.actualItem++;
    }
  }

  prevPage() {
    const reviewsBox = this.element.nativeElement.querySelector('.app-reviews-list');
    const widthItem = reviewsBox.clientWidth;
    if (this.actualItem > 1) {
      this.tempWhidthPage -= widthItem;
      reviewsBox.scroll((this.tempWhidthPage), 0);
      this.actualItem--;
    }
  }

  goToPage(page: number) {
    const reviewsBox = this.element.nativeElement.querySelector('.app-reviews-list');
    const widthItem = reviewsBox.clientWidth;
    reviewsBox.scroll((widthItem * page), 0);
    this.actualItem = page + 1;
    this.tempWhidthPage = widthItem * page;
  }

  getPageWidth(event) {
    this.size = event.target.innerWidth;
  }

  setTotalPages() {
    this.totalPages = this.size < 986 ? this.reviews.length : this.reviews.length / 4;
    this.totalPagesArray = [];
    for (let index = 0; index < this.totalPages; index++) {
      this.totalPagesArray.push(index);
    }
  }
}
