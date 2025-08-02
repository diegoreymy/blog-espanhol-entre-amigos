import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { BlogService } from '../services/blog.service';
import { IPost } from '../models/IPost.model';

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<IPost | null> {
  constructor(private blogService: BlogService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPost | null> {
    const slug = route.paramMap.get('slug');
    if (!slug) return of(null);
    return this.blogService.getPosts().pipe(
      // Buscar el post por slug
      catchError(() => of([])),
      // Mapear el array de posts para encontrar el que coincide con el slug
      // y devolver el observable de detalles por id
      // Si no se encuentra, devolver null
      switchMap((posts: IPost[]) => {
        const found = posts.find(post => post.slug === slug);
        if (!found) return of(null);
        return this.blogService.getPostDetails(String(found.id)).pipe(
          catchError(() => of(null))
        );
      })
    );
  }
}
