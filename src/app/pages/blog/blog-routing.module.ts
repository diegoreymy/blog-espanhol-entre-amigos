import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './components/blog/blog.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { PostResolver } from './resolvers/post.resolver';


const routes: Routes = [
  {
    path: '',
    component: BlogComponent
  },
  {
    path: ':slug',
    component: PostPageComponent,
    resolve: { post: PostResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
