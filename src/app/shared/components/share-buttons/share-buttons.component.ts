import { Component, OnInit, Input, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { faWhatsapp, faLinkedinIn, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { isPlatformBrowser } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';
import Utils from '../../utils';

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

  size: number;
  subscriptions = new Subscription();

  constructor(// tslint:disable-next-line: ban-types
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.size = window.innerWidth;
      this.subscriptions.add(fromEvent(window, 'resize').subscribe((event: Event) => {
        this.getPageWidth(event);
      }));
    }
  }

  share(item: string) {
    if (isPlatformBrowser(this.platformId)) {
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
  }

  shareWithFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${this.url}`;
    window.open(url, 'Espanhol entre Amigos', 'height=500,width=520,top=200,left=300,resizable');
  }

  shareWithTwitter() {
    const url = `https://twitter.com/intent/tweet?url=${this.url}`;
    window.open(url, 'Espanhol entre Amigos');
  }

  shareWithlinkedin() {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${this.url}`;
    window.open(url, 'Espanhol entre Amigos', 'height=500,width=520,top=200,left=300,resizable');
  }

  shareWithWhatsapp() {
    let url = `https://web.whatsapp.com/send?text=${this.url}`;
    if (this.size < 986) {
      if (Utils.getMobileOperatingSystem() === 'Android') {
        url = `whatsapp://send?text=${this.url}`;
      }
      if (Utils.getMobileOperatingSystem() === 'iOS') {
        url = `https://api.whatsapp.com/send?text=${this.url}`;
      }
    }
    window.open(url, 'Espanhol entre Amigos');
  }

  getPageWidth(event) {
    this.size = event.target.innerWidth;
  }
}
