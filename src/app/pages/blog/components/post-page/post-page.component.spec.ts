import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPageComponent } from './post-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import { BlogSidebarComponent } from '../blog-sidebar/blog-sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const mockBlogService = {
  getPosts: () => {},
  getPostDetails: () => {},
};


describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FontAwesomeModule ],
      declarations: [ PostPageComponent, PostDetailComponent, BlogSidebarComponent ],
      providers: [
        { provide: ActivatedRoute,  useValue: { fragment: of({ id: '1' })}},
        { provide: BlogService, useValue: mockBlogService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
