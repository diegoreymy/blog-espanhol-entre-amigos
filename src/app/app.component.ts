import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router
  ) {
    const navEndEvents$ = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      );
    navEndEvents$.subscribe((event: NavigationEnd) => {
      gtag('config', 'G-0G922NQS1C', {
        page_path: event.urlAfterRedirects
      });
    });
  }
}
