import { Component, OnInit, Input } from '@angular/core';
import { faWhatsapp, faLinkedinIn, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss']
})
export class ShareButtonsComponent implements OnInit {

  @Input() url: string;
  @Input() title: string;
  @Input() description: string;
  @Input() image: string;

  socialNetworksToShare = ['facebook', 'twitter', 'linkedin', 'whatsapp'];

  icons = {
    facebook: faFacebookF,
    twitter: faTwitter,
    linkedin: faLinkedinIn,
    whatsapp: faWhatsapp,
  };

  constructor() { }

  ngOnInit(): void { }

  share(item: string) {
    switch (item) {
      case 'facebook':
        this.shareWithFacebook();
        break;
      case 'twitter':
        this.shareWithTwitter();
        break;
      case 'linkedin':
        this.shareWithlinkedin();
        break;
      case 'whatsapp':
        this.shareWithWhatsapp();
        break;
    }
  }

  shareWithFacebook() {
    const url = `http://www.facebook.com/sharer.php?u=${this.url}`;
    window.open(url, 'Espanhol entre Amigos', 'height=500,width=520,top=200,left=300,resizable');
  }

  shareWithTwitter() {
    const url = `http://twitter.com/share?url=${this.url}`;
    window.open(url, 'Espanhol entre Amigos');
  }

  shareWithlinkedin() {
    const url = `http://www.linkedin.com/shareArticle?mini=true&url=${this.url}`;
    window.open(url, 'Espanhol entre Amigos', 'height=500,width=520,top=200,left=300,resizable');
  }

  shareWithWhatsapp() {
    const url = `https://web.whatsapp.com/send?text=${this.url}`;
    window.open(url, 'Espanhol entre Amigos');
  }
}
