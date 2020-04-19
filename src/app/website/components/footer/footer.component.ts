import { Component, OnInit } from '@angular/core';
import { faFacebook, faInstagram, faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faYoutube = faYoutube;
  faSpotify = faSpotify;

  constructor() { }

  ngOnInit() {
  }

}
