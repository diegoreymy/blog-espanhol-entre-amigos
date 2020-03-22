import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPost } from '../models/IPost.model';
import { HttpClient } from '@angular/common/http';
import { IPostDetail } from '../models/iPostDetail.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>('assets/json/posts.json');
  }

  public getPostDetails(slug: string): Observable<IPostDetail[]> {
    return this.http.get<IPostDetail[]>('assets/json/post-details.json').pipe(
      map((post: IPostDetail[]) => post.filter(resp => resp.slug === slug))
    );
  }
}
