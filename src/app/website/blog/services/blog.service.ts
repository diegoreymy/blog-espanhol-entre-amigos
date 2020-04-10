import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IPosts } from '../models/IPosts.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  url = 'https://espanol-entre-amigos.firebaseio.com';

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<IPosts[]> {
    return this.http.get<IPosts[]>(`${this.url}/posts.json`);
  }

  public getPostDetails(id: string): Observable<IPosts> {
    return this.http.get<IPosts>(`${this.url}/posts/${id}.json`);
  }
}
