import { Component, Input, ViewEncapsulation, OnChanges, OnInit, PLATFORM_ID, Inject, Renderer2 } from '@angular/core';
import { faArrowLeft, faBell } from '@fortawesome/free-solid-svg-icons';
import { IPost } from '../../models/IPost.model';
import { Meta, Title } from '@angular/platform-browser';
import { IPostImages } from '../../models/IPostImages.model';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { isPlatformBrowser } from '@angular/common';

declare var document: Document;

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

  document: Document;

  constructor(
    private meta: Meta,
    private titleService: Title,
    private messaging: Messaging,
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2
  ) {
    this.document = document;
  }

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

  private createOrUpdateMetaTag(name: string, content: string, property?: string) {
    let element: HTMLMetaElement;
    
    if (property) {
      element = this.document.querySelector(`meta[property="${property}"]`) || this.renderer.createElement('meta');
      element.setAttribute('property', property);
    } else {
      element = this.document.querySelector(`meta[name="${name}"]`) || this.renderer.createElement('meta');
      element.setAttribute('name', name);
    }
    
    element.content = content;
    this.renderer.appendChild(this.document.head, element);
  }

  private createOrUpdateLinkTag(rel: string, href: string) {
    const existingElement = this.document.querySelector(`link[rel="${rel}"]`);
    let element: HTMLLinkElement;
    
    if (existingElement) {
      element = existingElement as HTMLLinkElement;
      element.setAttribute('href', href);
    } else {
      element = this.renderer.createElement('link') as HTMLLinkElement;
      element.setAttribute('rel', rel);
      element.setAttribute('href', href);
      this.renderer.appendChild(this.document.head, element);
    }
  }

  updateMetas() {
    if (!this.post) return;
    
    try {
      const postUrl = `https://espanholentreamigos.com.br/blog/${this.post.slug}`;
      const description = this.post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160);
      const imageUrl = this.imagesPost?.facebook || this.post.jetpack_featured_media_url;
      const title = this.post.title.rendered;
      
      // Set page title
      this.titleService.setTitle(`${title} | Español entre Amigos`);
      
      // Standard meta tags
      this.createOrUpdateMetaTag('description', description);
      
      // Open Graph / Facebook / LinkedIn
      this.createOrUpdateMetaTag('', 'article', 'og:type');
      this.createOrUpdateMetaTag('', 'Español entre Amigos', 'og:site_name');
      this.createOrUpdateMetaTag('', title, 'og:title');
      this.createOrUpdateMetaTag('', description, 'og:description');
      this.createOrUpdateMetaTag('', postUrl, 'og:url');
      
      // Only add image tags if we have an image
      if (imageUrl) {
        const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `https://espanholentreamigos.com.br${imageUrl}`;
        this.createOrUpdateMetaTag('', fullImageUrl, 'og:image');
        this.createOrUpdateMetaTag('', '1200', 'og:image:width');
        this.createOrUpdateMetaTag('', '630', 'og:image:height');
        this.createOrUpdateMetaTag('twitter:image', fullImageUrl);
      }
      
      // Canonical URL
      this.createOrUpdateLinkTag('canonical', postUrl);
      
      // Twitter Card
      this.createOrUpdateMetaTag('twitter:card', 'summary_large_image');
      this.createOrUpdateMetaTag('twitter:title', title);
      this.createOrUpdateMetaTag('twitter:description', description);
      this.createOrUpdateMetaTag('twitter:domain', 'espanholentreamigos.com.br');
      this.createOrUpdateMetaTag('twitter:url', postUrl);
      
      // Additional meta tags for better sharing
      this.createOrUpdateMetaTag('article:published_time', this.post.date);
      this.createOrUpdateMetaTag('article:author', 'Marioly Guerrero');
      this.createOrUpdateMetaTag('article:section', 'Blog');
      
    } catch (error) {
      console.error('Error updating meta tags:', error);
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
