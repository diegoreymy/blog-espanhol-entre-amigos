import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPosts } from '../models/IPosts.model';
import { HttpClient } from '@angular/common/http';
import { IPostDetail } from '../models/IPostDetail.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<IPosts[]> {
    return this.http.get<IPosts[]>(`${this.API_URL}/posts.json`);
  }

  public getPostDetails(id: string): Observable<IPostDetail> {
    return this.http.get<IPostDetail>(`${this.API_URL}/post/${id}.json`);
  }
}
