import { Component, Input, ViewEncapsulation, OnChanges, OnInit } from '@angular/core';
import { faArrowLeft, faBell } from '@fortawesome/free-solid-svg-icons';
import { IPost } from '../../models/IPost.model';
import { Meta } from '@angular/platform-browser';
import { IPostImages } from '../../models/IPostImages.model';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit, OnChanges {

  @Input() post: IPost;
  imagesPost: IPostImages;
  hasToken: boolean;

  constructor(
    private meta: Meta,
    private messaging: AngularFireMessaging,
  ) { }

  icons = {
    faArrowLeft,
    faBell
  };

  ngOnInit() {
    this.getToken();
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
    this.meta.updateTag({ property: 'og:title', content: `Espanhol entre Amigos - ${this.post.title}` });
    this.meta.updateTag({ property: 'og:url', content: `https://espanholentreamigos.com.br/blog/${this.post.slug}` });
    this.meta.updateTag({ property: 'og:type', content: `website` });
    this.meta.updateTag({ property: 'og:description', content: this.post.title.rendered });
    this.meta.updateTag({ name: 'twitter:title', content: `Espanhol entre Amigos - ${this.post.title}` });
    this.meta.updateTag({ name: 'twitter:image', content: `${this.imagesPost.facebook}` });
    this.meta.updateTag({ name: 'twitter:description', content: `Espanhol entre Amigos - ${this.post.title}` });
    this.meta.updateTag({ name: 'twitter:domain', content: `https://espanholentreamigos.com.br/blog/${this.post.slug}` });
    this.meta.updateTag({ name: 'twitter:card', content: `summary_large_image` });
  }

  requestPermissionNotifications() {
    this.messaging.requestToken.subscribe(token => {
      if (token) {
        localStorage.setItem('token', token);
        this.getToken();
      }
    });
  }

  getToken() {
    const token = localStorage.getItem('token');
    this.hasToken = token !== undefined && token !== null && token !== '';
  }

  listenNotifications() {
    this.messaging.messages.subscribe(console.log);
  }

  onClickGetNotification() {
    this.requestPermissionNotifications();
    this.listenNotifications();
  }
}
