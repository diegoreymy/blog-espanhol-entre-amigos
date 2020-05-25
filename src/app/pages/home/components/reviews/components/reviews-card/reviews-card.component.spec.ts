import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsCardComponent } from './reviews-card.component';
import { IReview } from '../../models/iReview.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const review: IReview = {
  id: 1,
  image: 'assets/images/reviews/tiago.jpg',
  name: 'Tiago Aquino',
  message: 'Marioly é uma professora muito dedicada e atenciosa.'
};

describe('ReviewsCardComponent', () => {
  let component: ReviewsCardComponent;
  let fixture: ComponentFixture<ReviewsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsCardComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsCardComponent);
    component = fixture.componentInstance;
    component.review = review;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openSeeMore when seeMore is false', () => {
    component.seeMore = false;
    component.openSeeMore();
    expect(component.seeMore).toEqual(true);
  });

  it('should openSeeMore when seeMore is true', () => {
    component.seeMore = true;
    component.openSeeMore();
    expect(component.seeMore).toEqual(false);
  });

});
