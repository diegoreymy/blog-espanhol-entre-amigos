import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'sobre-mi',
      loadChildren: () => import('./about-me/about-me.module').then(m => m.AboutMeModule)
    },
    {
      path: 'blog',
      loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
    },
    {
      path: '**',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
