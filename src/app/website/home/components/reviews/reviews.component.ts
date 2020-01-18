import { Component, OnInit, ElementRef } from '@angular/core';

import { faAngleLeft, faAngleRight, faCircle as solidCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as regularCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  actualPage = 1;
  tempWhidthPage = 0;
  totalPages = 5;
  activeIndicator = false;

  icons = {
    faAngleLeft,
    faAngleRight,
    solidCircle,
    regularCircle
  };

  constructor(
    private element: ElementRef
  ) { }

  ngOnInit() {
  }

  nextPage() {
    const reviewsBox = document.querySelector('.app-reviews-list');
    const widthPage = reviewsBox.clientWidth;
    if (this.actualPage < this.totalPages) {
      this.actualPage === 1 ? this.tempWhidthPage = widthPage : this.tempWhidthPage += widthPage;
      reviewsBox.scroll((this.tempWhidthPage), 0);
      this.actualPage++;
    }
  }

  prevPage() {
    const reviewsBox = document.querySelector('.app-reviews-list');
    const widthPage = reviewsBox.clientWidth;
    if (this.actualPage > 1) {
      this.tempWhidthPage -= widthPage;
      reviewsBox.scroll((this.tempWhidthPage), 0);
      this.actualPage--;
    }
  }

  goToPage(page: number){
    const reviewsBox = document.querySelector('.app-reviews-list');
    const widthPage = reviewsBox.clientWidth;
    if (this.actualPage < this.totalPages) {
      this.actualPage === 1 ? this.tempWhidthPage = widthPage : this.tempWhidthPage += widthPage;
      reviewsBox.scroll((this.tempWhidthPage), 0);
      this.actualPage++;
    }
  }
}
