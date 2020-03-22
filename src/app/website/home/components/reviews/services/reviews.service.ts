import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReview } from '../models/iReview.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) {
  }

  public getReviews(): Observable<IReview[]> {
    return this.http.get<IReview[]>('assets/json/text-reviews.json');
  }
}
