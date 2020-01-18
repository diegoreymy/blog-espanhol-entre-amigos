import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardListComponent } from './post-card-list.component';

describe('PostCardListComponent', () => {
  let component: PostCardListComponent;
  let fixture: ComponentFixture<PostCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
