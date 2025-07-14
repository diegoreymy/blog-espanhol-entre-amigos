import { TestBed } from '@angular/core/testing';

import { ReviewsService } from './reviews.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ReviewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [ReviewsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should be created', () => {
    const service: ReviewsService = TestBed.inject(ReviewsService);
    expect(service).toBeTruthy();
  });
});
