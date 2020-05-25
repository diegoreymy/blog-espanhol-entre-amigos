import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './components/blog/blog.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostCardListComponent } from './components/post-card-list/post-card-list.component';
import { BlogSidebarComponent } from './components/blog-sidebar/blog-sidebar.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    BlogComponent,
    PostCardComponent,
    PostCardListComponent,
    BlogSidebarComponent,
    PostPageComponent,
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ]
})
export class BlogModule { }
