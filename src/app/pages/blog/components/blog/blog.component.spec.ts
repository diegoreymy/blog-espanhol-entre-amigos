import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { BlogComponent } from './blog.component';
import { PostCardListComponent } from '../post-card-list/post-card-list.component';
import { BlogSidebarComponent } from '../blog-sidebar/blog-sidebar.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [BlogComponent, PostCardListComponent, BlogSidebarComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
