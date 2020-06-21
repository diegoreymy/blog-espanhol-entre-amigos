import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'sobre-mi',
      loadChildren: () => import('./pages/about-me/about-me.module').then(m => m.AboutMeModule)
    },
    {
      path: 'blog',
      loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
    },
    {
      path: '**',
      loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    useHash: false,
    anchorScrolling: 'enabled',
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
