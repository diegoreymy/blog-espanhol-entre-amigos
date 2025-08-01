import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../models/IPost.model';
import { BlogService } from '../../services/blog.service';
import { Meta } from '@angular/platform-browser';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss'],
    standalone: false
})
export class BlogComponent implements OnInit {

  posts$: Observable<IPost[]>;

  constructor(
    private blogService: BlogService,
    private metaService: Meta,
    private swUpdate: SwUpdate,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.posts$ = this.blogService.getPosts();
   }

  ngOnInit() {
    this.metaService.addTags([
      {name: 'keywords', content: 'Español, Espanhol, Blog'},
      {name: 'description', content: 'Blog de artigos relacionados ao ensino de Espanhol para Brasileiros'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updatePWA();
    }
  }
  
  updatePWA() {
    this.swUpdate.versionUpdates.subscribe(event => {
      if (event.type === 'VERSION_READY') {
        window.location.reload();
      }
    });
  }

}
