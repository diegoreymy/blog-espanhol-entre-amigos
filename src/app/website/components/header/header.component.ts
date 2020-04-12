import { Component, OnInit } from '@angular/core';
import { faFacebook, faInstagram, faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons';

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

  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

}
