import { Component, OnInit, ElementRef, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { faAngleLeft, faAngleRight, faCircle as solidCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as regularCircle } from '@fortawesome/free-regular-svg-icons';
import { ReviewsService } from './services/reviews.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { IReview } from './models/iReview.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss'],
    standalone: false
})
export class ReviewsComponent implements OnInit, OnDestroy {

  actualItem = 1;
  tempWhidthPage = 0;
  totalPages = 0;
  activeIndicator = false;
  reviewsService$: Observable<IReview[]>;
  subscriptions = new Subscription();
  reviews: IReview[] = [];
  size: number;
  totalPagesArray = [];
  reviewsBox: HTMLDivElement;
  widthItem: number;
  scrollLeft: number;
  loadAll = false;

  icons = {
    faAngleLeft,
    faAngleRight,
    solidCircle,
    regularCircle
  };

  constructor(
    private element: ElementRef,
    private reviewsService: ReviewsService,
    // tslint:disable-next-line: ban-types
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.size = window.innerWidth;
      this.subscriptions.add(fromEvent(window, 'resize').subscribe((event: Event) => {
        this.getPageWidth(event);
        this.setTotalPages();
      }));
    }
    this.subscriptions.add(this.reviewsService.getReviews().subscribe(reviews => {
      this.reviews = reviews;
      this.setTotalPages();
      this.reviewsBox = this.element.nativeElement.querySelector('.app-reviews-list');
      this.widthItem = this.reviewsBox.clientWidth;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  nextPage() {
    if (this.size > 986) {
      if (this.actualItem < this.totalPages) { this.actualItem++; }
    } else {
      this.tempWhidthPage = Math.round(this.scrollLeft / this.widthItem) * this.widthItem;
    }
    this.actualItem === 1 ? this.tempWhidthPage = this.widthItem : this.tempWhidthPage += this.widthItem;
    this.reviewsBox.scrollLeft = this.tempWhidthPage;
  }

  prevPage() {
    if (this.size > 986) {
      if (this.actualItem > 1) { this.actualItem--; }
    } else {
      this.tempWhidthPage = Math.round(this.scrollLeft / this.widthItem) * this.widthItem;
    }
    this.tempWhidthPage -= this.widthItem;
    this.reviewsBox.scrollLeft = this.tempWhidthPage;
  }

  goToPage(page: number) {
    this.reviewsBox.scrollLeft =  this.widthItem * page;
    this.actualItem = page + 1;
    this.tempWhidthPage = this.widthItem * page;
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

  onScroll(event: Event) {
    this.cancelSeeMore();
    if (this.size < 986) {
      const target: any = event.target;
      this.scrollLeft = target.scrollLeft;
      this.actualItem = Math.round(this.scrollLeft / this.widthItem) + 1;
    }
  }

  cancelSeeMore() {
    const container = this.element.nativeElement.querySelector('p.see-more');
    if (container) {
      container.click();
    }
  }
}
