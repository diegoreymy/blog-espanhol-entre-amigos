import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ FontAwesomeModule, MaterialModule, RouterTestingModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should toggleMenu when openMenu is false', () => {
    component.openMenu = false;
    component.toggleMenu();
    expect(component.openMenu).toEqual(true);
    expect(component.toggleMenu).toBeTruthy();
  });

  it('should toggleMenu when openMenu is true', () => {
    component.openMenu = true;
    component.toggleMenu();
    expect(component.openMenu).toEqual(false);
    expect(component.toggleMenu).toBeTruthy();
  });
});
