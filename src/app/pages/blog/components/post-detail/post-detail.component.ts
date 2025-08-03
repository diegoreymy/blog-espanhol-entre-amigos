import { Component, Input, ViewEncapsulation, OnChanges, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { faArrowLeft, faBell } from '@fortawesome/free-solid-svg-icons';
import { IPost } from '../../models/IPost.model';
import { Meta } from '@angular/platform-browser';
import { IPostImages } from '../../models/IPostImages.model';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class PostDetailComponent implements OnInit, OnChanges {

  @Input() post: IPost;
  imagesPost: IPostImages;
  hasToken: boolean;

  constructor(
    private meta: Meta,
    private messaging: Messaging,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  icons = {
    faArrowLeft,
    faBell
  };

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getToken();
    }
    if (this.post) {
      this.imagesPost = JSON.parse(this.post.excerpt.rendered.split('<pre>')[1].replace('</pre>', '').trim());
      this.updateMetas();
    }
  }

  ngOnChanges() {
    if (this.post) {
      this.imagesPost = JSON.parse(this.post.excerpt.rendered.split('<pre>')[1].replace('</pre>', '').trim());
      this.updateMetas();
    }
  }

  updateMetas() {
    // Build a rich description (LinkedIn suggests >100 characters)
    const rawHtml = this.post.excerpt?.rendered || this.post.content?.rendered || '';
    const text = rawHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const description = text.slice(0, 160);

    const url = `https://espanholentreamigos.com.br/blog/${this.post.slug}`;
    const title = `Espanhol entre Amigos - ${this.post.title.rendered}`;

    // Standard + Open Graph
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:image', content: this.imagesPost.facebook });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:description', content: description });

    // Twitter
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:image', content: this.imagesPost.facebook });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:domain', content: url });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    // Author & publish time (for LinkedIn / OpenGraph)
    this.meta.updateTag({ name: 'author', content: 'Marioly Guerrero' });
    this.meta.updateTag({ property: 'article:author', content: 'Marioly Guerrero' });
    this.meta.updateTag({ property: 'article:published_time', content: this.post.date });
  }

  }

  requestPermissionNotifications() {
    // Nueva forma de obtener el token de notificaciones push
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        getToken(this.messaging, { vapidKey: 'TU_VAPID_KEY' })
          .then(token => {
            if (token) {
              localStorage.setItem('token', token);
              this.getToken();
            }
          });
      }
    });
  }

  getToken() {
    const token = localStorage.getItem('token');
    this.hasToken = token !== undefined && token !== null && token !== '';
  }

  listenNotifications() {
    // Nueva forma de escuchar mensajes push
    onMessage(this.messaging, payload => {
      console.log(payload);
    });
  }

  onClickGetNotification() {
    this.requestPermissionNotifications();
    this.listenNotifications();
  }
}
