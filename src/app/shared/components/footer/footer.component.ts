import { Component } from '@angular/core';
import { faFacebook, faInstagram, faYoutube, faSpotify, faAngular } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faYoutube = faYoutube;
  faSpotify = faSpotify;
  faAngular = faAngular;
}
