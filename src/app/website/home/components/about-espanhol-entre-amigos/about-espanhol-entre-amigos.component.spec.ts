import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutEspanholEntreAmigosComponent } from './about-espanhol-entre-amigos.component';

describe('AboutEspanholEntreAmigosComponent', () => {
  let component: AboutEspanholEntreAmigosComponent;
  let fixture: ComponentFixture<AboutEspanholEntreAmigosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutEspanholEntreAmigosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutEspanholEntreAmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
