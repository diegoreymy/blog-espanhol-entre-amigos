import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReview } from '../models/iReview.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  public getReviews(): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${this.API_URL}/reviews.json`);
  }
}
