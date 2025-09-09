import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPost } from '../models/IPost.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.API_URL}/posts?per_page=15`);
  }

  public getPostDetails(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${this.API_URL}/posts/${id}`);
  }
}
