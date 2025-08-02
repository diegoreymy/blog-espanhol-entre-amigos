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
  }

  ngOnChanges() {
    if (this.post) {
      this.imagesPost = JSON.parse(this.post.excerpt.rendered.split('<pre>')[1].replace('</pre>', '').trim());
      this.updateMetas();
    }
  }

  updateMetas() {
    const postUrl = `https://espanholentreamigos.com.br/blog/${this.post.slug}`;
    const description = this.post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160);
    const imageUrl = this.imagesPost?.facebook || this.post.jetpack_featured_media_url;
    const title = this.post.title.rendered;
    
    // Standard meta tags
    this.meta.updateTag({ name: 'description', content: description });
    
    // Open Graph / Facebook / LinkedIn
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Español entre Amigos' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: postUrl });
    
    // Only add image tags if we have an image
    if (imageUrl) {
      this.meta.updateTag({ property: 'og:image', content: imageUrl });
      this.meta.updateTag({ property: 'og:image:width', content: '1200' });
      this.meta.updateTag({ property: 'og:image:height', content: '630' });
      this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    }
    
    // Canonical URL
    this.meta.updateTag({ rel: 'canonical', href: postUrl });
    
    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:domain', content: `https://espanholentreamigos.com.br/blog/${this.post.slug}` });
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
