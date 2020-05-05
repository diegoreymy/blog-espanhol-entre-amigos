import { TestBed } from '@angular/core/testing';

import { ReviewsService } from './reviews.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReviewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ReviewsService]
  }));

  it('should be created', () => {
    const service: ReviewsService = TestBed.inject(ReviewsService);
    expect(service).toBeTruthy();
  });
});
