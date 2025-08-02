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
    this.meta.updateTag({ name: 'description', content: this.post.title.rendered });
    this.meta.updateTag({ property: 'og:image', content: `${this.imagesPost.facebook}` });
    this.meta.updateTag({ property: 'og:title', content: `Espanhol entre Amigos - ${this.post.title.rendered}` });
    this.meta.updateTag({ property: 'og:url', content: `https://espanholentreamigos.com.br/blog/${this.post.slug}` });
    this.meta.updateTag({ property: 'og:type', content: `website` });
    this.meta.updateTag({ property: 'og:description', content: this.post.title.rendered });
    this.meta.updateTag({ name: 'twitter:title', content: `Espanhol entre Amigos - ${this.post.title.rendered}` });
    this.meta.updateTag({ name: 'twitter:image', content: `${this.imagesPost.facebook}` });
    this.meta.updateTag({ name: 'twitter:description', content: `Espanhol entre Amigos - ${this.post.title.rendered}` });
    this.meta.updateTag({ name: 'twitter:domain', content: `https://espanholentreamigos.com.br/blog/${this.post.slug}` });
    this.meta.updateTag({ name: 'twitter:card', content: `summary_large_image` });
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
