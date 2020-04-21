import { Component, OnInit, Inject } from '@angular/core';
import { faFacebook, faInstagram, faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  openMenu = false;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faYoutube = faYoutube;
  faSpotify = faSpotify;
  faTimes = faTimes;
  faBars = faBars;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
    this.openMenu === true ? this.document.body.classList.add('not-scroll') : this.document.body.classList.remove('not-scroll');
  }

}
