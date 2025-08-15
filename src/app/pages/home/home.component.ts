import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit, AfterViewInit {

  private fragment: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private metaService: Meta,
    private title: Title
  ) { }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => this.fragment = fragment);

    const homeUrl = 'https://espanholentreamigos.com.br/';
    const title = 'Espanhol entre Amigos';
    const image = 'https://espanholentreamigos.com.br/assets/images/banner/banner-facebook.jpg';

    this.title.setTitle(title);
    this.metaService.addTags([
      { name: 'keywords', content: 'Español, Espanhol, Blog, Español entre amigos' },
      { name: 'description', content: 'Site relacionado ao ensino de espanhol para brasileiros' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:image', content: image },
      { property: 'og:image:secure_url', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:title', content: title },
      { property: 'og:url', content: homeUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: 'Site relacionado ao ensino de espanhol para brasileiros' },
      { property: 'og:site_name', content: 'Espanhol entre Amigos' },
      { property: 'og:locale', content: 'es_ES' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@' },
    ]);
  }

  ngAfterViewInit(): void {
    try {
      if (this.fragment) {
        const el = document.querySelector('#' + this.fragment);
        if (el) {
          (el as HTMLElement).scrollIntoView();
        }
      }
    } catch (e) { }
  }

}
