// src/app/pages/blog/resolvers/post.resolver.ts
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BlogService } from '../services/blog.service';
import { IPost } from '../models/IPost.model';

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<IPost> {
  constructor(
    private blogService: BlogService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IPost> {
    const fragmentId = route.fragment;
    if (fragmentId) {
      // si vienen como fragment (#123), carga directo por ID
      return this.blogService.getPostDetails(fragmentId).pipe(
        catchError(() => {
          this.router.navigate(['/blog']);
          return EMPTY;
        })
      );
    }

    const slug = route.paramMap.get('slug');
    return this.blogService.getPosts().pipe(
      map(posts => posts.find(p => p.slug === slug)),
      switchMap(post => {
        if (post) {
          return this.blogService.getPostDetails(String(post.id));
        }
        this.router.navigate(['/blog']);
        return EMPTY;
      }),
      catchError(() => {
        this.router.navigate(['/blog']);
        return EMPTY;
      })
    );
  }
}
