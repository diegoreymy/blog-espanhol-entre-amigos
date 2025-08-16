import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit, AfterViewInit {

  private fragment: string;

  constructor(
    private route: ActivatedRoute,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.route.fragment.subscribe( fragment => this.fragment = fragment );
    this.metaService.addTags([
      {name: 'keywords', content: 'Español, Espanhol, Blog, Español entre amigos'},
      {name: 'description', content: 'Site relacionado ao ensino de espanhol para brasileiros'},
      {name: 'robots', content: 'index, follow'},
      {property: 'og:image', content: `https://espanholentreamigos.com.br/assets/images/banner/banner-facebook.jpg`},
      {property: 'og:title', content: `Espanhol entre Amigos`},
      {property: 'og:url', content: `https://espanholentreamigos.com.br/`},
      {property: 'og:type', content: `website`},
      {property: 'og:description', content: 'Site relacionado ao ensino de espanhol para brasileiros'},
      {property: 'og:site_name', content: 'Espanhol entre Amigos'},
      {property: 'og:locale', content: 'es_ES'},
      {property: 'og:image:width', content: '1200'},
      {property: 'og:image:height', content: '630'},
    ]);
  }

  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }

}
