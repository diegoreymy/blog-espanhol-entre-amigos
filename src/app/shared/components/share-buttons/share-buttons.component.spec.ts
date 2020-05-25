import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareButtonsComponent } from './share-buttons.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ShareButtonsComponent', () => {
  let component: ShareButtonsComponent;
  let fixture: ComponentFixture<ShareButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareButtonsComponent ],
      imports: [ FontAwesomeModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should share with facebook', () => {
    component.share('facebook');
    spyOn(component, 'shareWithFacebook');
    expect(component.shareWithFacebook).toBeTruthy();
  });

  it('should share with twitter', () => {
    component.share('twitter');
    expect(component.shareWithTwitter).toBeTruthy();
  });

  it('should share with linkedin', () => {
    component.share('linkedin');
    expect(component.shareWithlinkedin).toBeTruthy();
  });

  it('should share with whatsapp', () => {
    component.share('whatsapp');
    expect(component.shareWithWhatsapp).toBeTruthy();
  });

});
