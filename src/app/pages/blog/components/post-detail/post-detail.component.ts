import { Component, Input, ViewEncapsulation, OnChanges, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { faArrowLeft, faBell } from '@fortawesome/free-solid-svg-icons';
import { IPost } from '../../models/IPost.model';
import { Meta, Title, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IPostImages } from '../../models/IPostImages.model';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

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
  featuredImage: string = '';
  contentHtml: SafeHtml | '' = '';
  mobileImage: string = '';

  constructor(
    private meta: Meta,
    private title: Title,
    private sanitizer: DomSanitizer,
    private messaging: Messaging,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private doc: Document
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
      this.featuredImage = this.mapImageUrl(this.post.jetpack_featured_media_url);
      this.mobileImage = this.imagesPost?.cuadrito ? this.mapImageUrl(this.imagesPost.cuadrito) : '';
      this.contentHtml = this.sanitizer.bypassSecurityTrustHtml(this.mapContentHtml(this.post.content?.rendered || ''));
      this.updateMetas();
    }
  }

  ngOnChanges() {
    if (this.post) {
      this.imagesPost = JSON.parse(this.post.excerpt.rendered.split('<pre>')[1].replace('</pre>', '').trim());
      this.featuredImage = this.mapImageUrl(this.post.jetpack_featured_media_url);
      this.contentHtml = this.sanitizer.bypassSecurityTrustHtml(this.mapContentHtml(this.post.content?.rendered || ''));
      this.updateMetas();
    }
  }

  updateMetas() {
    // Build a rich description (LinkedIn suggests >100 characters)
    // Exclude the <pre>…</pre> block that contains the JSON de imágenes para evitar que aparezca en la descripción
    const htmlSource = this.post.excerpt?.rendered || this.post.content?.rendered || '';
    const rawHtml = htmlSource.split('<pre>')[0];
    const text = rawHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const description = text.slice(0, 160);

    const url = `https://espanholentreamigos.com.br/blog/${this.post.slug}`;
    const title = `Espanhol entre Amigos - ${this.post.title.rendered}`;

    // Map WordPress.com image URL to proxied URL under our domain
    const wpBase = 'https://espanholentreamigos596581947.wordpress.com/wp-content/uploads/';
    const wpCdnBase = 'https://i0.wp.com/espanholentreamigos596581947.wordpress.com/wp-content/uploads/';
    const proxyBase = 'https://espanholentreamigos.com.br/wp-content/uploads/';
    const originalImage = this.imagesPost.facebook || '';
    let mapped = originalImage.startsWith(wpBase)
      ? originalImage.replace(wpBase, proxyBase)
      : originalImage.startsWith(wpCdnBase)
        ? originalImage.replace(wpCdnBase, proxyBase)
        : originalImage;
    // Ensure proper URL encoding (spaces, accents)
    const image = mapped ? encodeURI(mapped) : mapped;

    // Set document title
    this.title.setTitle(title);

    // Standard + Open Graph
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:site_name', content: 'Espanhol entre Amigos' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_ES' });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:secure_url', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: title });

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:url', content: url });
    // Optional: set your Twitter @username when available
    // this.meta.updateTag({ name: 'twitter:site', content: '@your_account' });

    // Author & publish time (for LinkedIn / OpenGraph)
    this.meta.updateTag({ name: 'author', content: 'Marioly Guerrero' });
    this.meta.updateTag({ property: 'article:author', content: 'Marioly Guerrero' });
    this.meta.updateTag({ property: 'article:published_time', content: this.post.date });
    if ((this.post as any)?.modified) {
      this.meta.updateTag({ property: 'article:modified_time', content: (this.post as any).modified });
    }

    // Canonical link
    this.setCanonical(url);
  }

  private mapImageUrl(originalUrl: string): string {
    if (!originalUrl) return '';
    const wpBase = 'https://espanholentreamigos596581947.wordpress.com/wp-content/uploads/';
    const wpCdnBase = 'https://i0.wp.com/espanholentreamigos596581947.wordpress.com/wp-content/uploads/';
    const proxyBase = 'https://espanholentreamigos.com.br/wp-content/uploads/';
    let mapped = originalUrl.startsWith(wpBase)
      ? originalUrl.replace(wpBase, proxyBase)
      : originalUrl.startsWith(wpCdnBase)
        ? originalUrl.replace(wpCdnBase, proxyBase)
        : originalUrl;
    return mapped ? encodeURI(mapped) : mapped;
  }

  private mapContentHtml(html: string): string {
    if (!html) return '';
    // Reemplaza src/href que apunten a wordpress.com o i0.wp.com por el dominio propio
    const patterns = [
      /https:\/\/espanholentreamigos596581947\.wordpress\.com\/wp-content\/uploads\//g,
      /https:\/\/i0\.wp\.com\/espanholentreamigos596581947\.wordpress\.com\/wp-content\/uploads\//g
    ];
    const proxyBase = 'https://espanholentreamigos.com.br/wp-content/uploads/';
    let output = html;
    for (const p of patterns) {
      output = output.replace(p, proxyBase);
    }
    // encodeURI solo dentro de atributos src/href si hay espacios
    output = output.replace(/(src|href)=("|')([^"']+)(\2)/g, (_m, attr, q, url, q2) => {
      try {
        // Solo encodea si apunta a nuestro dominio de uploads
        if (url.startsWith(proxyBase)) {
          return `${attr}=${q}${encodeURI(url)}${q2}`;
        }
      } catch {}
      return `${attr}=${q}${url}${q2}`;
    });
    return output;
  }

  private setCanonical(url: string) {
    if (!this.doc) return;
    const head = this.doc.head || this.doc.getElementsByTagName('head')[0];
    if (!head) return;
    let link: HTMLLinkElement | null = head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
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
