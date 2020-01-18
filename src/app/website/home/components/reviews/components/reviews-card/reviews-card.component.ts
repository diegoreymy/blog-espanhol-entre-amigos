import { Component, OnInit } from '@angular/core';

import { faQuoteRight, faQuoteLeft, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reviews-card',
  templateUrl: './reviews-card.component.html',
  styleUrls: ['./reviews-card.component.scss']
})
export class ReviewsCardComponent implements OnInit {

  icons = {
    faQuoteRight,
    faQuoteLeft,
    faStar
  };

  constructor() { }

  ngOnInit() {
  }

}
