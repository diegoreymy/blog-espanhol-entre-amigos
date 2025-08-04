import { Component, OnInit, ElementRef, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { faAngleLeft, faAngleRight, faCircle as solidCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as regularCircle } from '@fortawesome/free-regular-svg-icons';
import { ReviewsService } from './services/reviews.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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

  isHandset = false;

  constructor(
    private element: ElementRef,
    private reviewsService: ReviewsService,
    private breakpointObserver: BreakpointObserver,
    // tslint:disable-next-line: ban-types
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    this.size = window.innerWidth;
    // Debounce resize event
    this.subscriptions.add(fromEvent(window, 'resize').pipe(debounceTime(50)).subscribe((event: Event) => {
      this.getPageWidth(event);
      this.setTotalPages();
    }));
    // Usar BreakpointObserver para detectar dispositivo
    this.subscriptions.add(
      this.breakpointObserver.observe([
        Breakpoints.Handset
      ]).subscribe(result => {
        this.isHandset = result.matches;
        this.setTotalPages();
      })
    );
  }
  this.subscriptions.add(this.reviewsService.getReviews().subscribe(reviews => {
    this.reviews = reviews;
    this.setTotalPages();
    this.reviewsBox = this.element.nativeElement.querySelector('.app-reviews-list');
    this.widthItem = this.reviewsBox.clientWidth;
    // Debounce scroll event
    if (this.reviewsBox) {
      this.subscriptions.add(
        fromEvent(this.reviewsBox, 'scroll', { passive: true }).pipe(debounceTime(30)).subscribe((event: Event) => {
          this.onScroll(event);
        })
      );
    }
  }));
}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  nextPage() {
  // Layout reads
  const size = this.size;
  const actualItem = this.actualItem;
  const totalPages = this.totalPages;
  const widthItem = this.widthItem;
  let tempWhidthPage = this.tempWhidthPage;
  let scrollLeft = this.scrollLeft;

  if (size > 986) {
    if (actualItem < totalPages) { this.actualItem++; }
  } else {
    tempWhidthPage = Math.round(scrollLeft / widthItem) * widthItem;
  }
  this.actualItem === 1 ? tempWhidthPage = widthItem : tempWhidthPage += widthItem;
  this.tempWhidthPage = tempWhidthPage;
  // Layout write
  requestAnimationFrame(() => {
    if (this.reviewsBox) this.reviewsBox.scrollLeft = tempWhidthPage;
  });
}

  prevPage() {
  // Layout reads
  const size = this.size;
  const actualItem = this.actualItem;
  const widthItem = this.widthItem;
  let tempWhidthPage = this.tempWhidthPage;
  let scrollLeft = this.scrollLeft;

  if (size > 986) {
    if (actualItem > 1) { this.actualItem--; }
  } else {
    tempWhidthPage = Math.round(scrollLeft / widthItem) * widthItem;
  }
  tempWhidthPage -= widthItem;
  this.tempWhidthPage = tempWhidthPage;
  // Layout write
  requestAnimationFrame(() => {
    if (this.reviewsBox) this.reviewsBox.scrollLeft = tempWhidthPage;
  });
}

  goToPage(page: number) {
  // Layout reads
  const widthItem = this.widthItem;
  // Layout write
  const scrollLeftValue = widthItem * page;
  this.actualItem = page + 1;
  this.tempWhidthPage = scrollLeftValue;
  requestAnimationFrame(() => {
    if (this.reviewsBox) this.reviewsBox.scrollLeft = scrollLeftValue;
  });
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
  // Layout reads
  const size = this.size;
  const widthItem = this.widthItem;
  if (size < 986) {
    const target: any = event.target;
    const scrollLeft = target.scrollLeft;
    // All reads done, now update state
    this.scrollLeft = scrollLeft;
    this.actualItem = Math.round(scrollLeft / widthItem) + 1;
  }
}

  cancelSeeMore() {
    const container = this.element.nativeElement.querySelector('p.see-more');
    if (container) {
      container.click();
    }
  }
}
