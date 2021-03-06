import { Component, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(
    private router: Router,
    private titleService: Title,
    private swUpdate: SwUpdate,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updatePWA();
      this.setAnalytics();
    }
  }

  updatePWA() {
    this.swUpdate.available.subscribe(() => window.location.reload());
  }

  setTitle(url: string): string {
    const urlParts = url.split('/');
    const titleTrainCase = urlParts[urlParts.length - 1];
    const title = titleTrainCase.split('-').join(' ');
    return title === '' || title.includes('#') ? 'Español entre Amigos' : `Español entre Amigos - ${title}`;
  }

  setAnalytics() {
    const navEndEvents$ = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      );
    navEndEvents$.subscribe((event: NavigationEnd) => {
      gtag('config', 'G-0G922NQS1C', {
        page_path: event.urlAfterRedirects
      });
      this.titleService.setTitle(this.setTitle(event.urlAfterRedirects));
      window.scrollTo(0, 0);
    });
  }

}
