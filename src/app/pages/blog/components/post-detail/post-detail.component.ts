import { Component, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IPostDetail } from '../../models/IPostDetail.model';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnChanges {

  @Input() post: IPostDetail;

  constructor(private meta: Meta) { }

  icons = {
    faArrowLeft,
  };

  ngOnChanges() {
    if (this.post) {
      this.updateMetas();
    }
  }

  updateMetas() {
    this.meta.updateTag({ name: 'og:image', content: `https://espanholentreamigos.com.br/${this.post.horizontalImage}` });
    this.meta.updateTag({ name: 'twitter:image', content: `https://espanholentreamigos.com.br/${this.post.horizontalImage}` });
    this.meta.updateTag({ name: 'og:title', content: `Espanhol entre Amigos - ${this.post.title}` });
    this.meta.updateTag({ name: 'twitter:title', content: `Espanhol entre Amigos - ${this.post.title}` });
    this.meta.updateTag({ name: 'twitter:description', content: `Espanhol entre Amigos - ${this.post.title}` });
    this.meta.updateTag({ name: 'og:type', content: `website` });
    this.meta.updateTag({ name: 'og:url', content: `https://espanholentreamigos.com.br/blog/${this.post.slug}` });
    this.meta.updateTag({ name: 'twitter:domain', content: `https://espanholentreamigos.com.br/blog/${this.post.slug}` });
    this.meta.updateTag({ name: 'twitter:card', content: `summary` });
  }
}
