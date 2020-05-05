import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardComponent } from './post-card.component';
import { IPosts } from '../../models/IPosts.model';

const post: IPosts = {
  id: 1,
  title: '10 consejos para aprender español rápido y divertido',
  slug: '10-consejos-para-aprender-espanol-rapido-y-divertido',
  veticalImage: 'assets/images/blog/10-consejos-para-aprender-espanol-es.jpg'
};

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
    component.post = post;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
