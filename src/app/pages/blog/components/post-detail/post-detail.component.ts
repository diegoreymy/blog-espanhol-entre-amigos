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
    this.meta.updateTag({ name: 'description', content: this.post.title });
    this.meta.updateTag({ property: 'og:image', content: `https://espanholentreamigos.com.br/${this.post.facebookImage}` });
    this.meta.updateTag({ property: 'og:title', content: `Espanhol entre Amigos - ${this.post.title}` });
    this.meta.updateTag({ property: 'og:url', content: `https://espanholentreamigos.com.br/blog/${this.post.slug}` });
    this.meta.updateTag({ property: 'og:type', content: `website` });
    this.meta.updateTag({ property: 'og:description', content: this.post.title });
    this.meta.updateTag({ property: 'twitter:title', content: `Espanhol entre Amigos - ${this.post.title}` });
    this.meta.updateTag({ property: 'twitter:image', content: `https://espanholentreamigos.com.br/${this.post.facebookImage}` });
    this.meta.updateTag({ property: 'twitter:description', content: `Espanhol entre Amigos - ${this.post.title}` });
    this.meta.updateTag({ property: 'twitter:domain', content: `https://espanholentreamigos.com.br/blog/${this.post.slug}` });
    this.meta.updateTag({ property: 'twitter:card', content: `summary_large_image` });
  }
}
