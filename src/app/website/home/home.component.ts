import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  private fragment: string;

  title = 'Bienvenido a Español entre Amigos';

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.route.fragment.subscribe( fragment => this.fragment = fragment );
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'Español, Espanhol, Blog, Español entre amigos'},
      {name: 'description', content: 'Site relacionado ao ensino de espanhol para brasileiros'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }

  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }

}
