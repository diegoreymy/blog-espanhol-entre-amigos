import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPageComponent } from './post-page.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import { BlogSidebarComponent } from '../blog-sidebar/blog-sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const mockBlogService = {
  getPosts: () => { },
  getPostDetails: () => { },
};


describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [PostPageComponent, PostDetailComponent, BlogSidebarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [FontAwesomeModule,
        AngularFireMessagingModule,
        AngularFireModule.initializeApp(environment.firebase)],
    providers: [
        { provide: ActivatedRoute, useValue: { fragment: of({ id: '1' }) } },
        { provide: BlogService, useValue: mockBlogService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
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
