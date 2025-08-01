import 'zone.js/node';

import { renderApplication } from '@angular/platform-server';
import { AppComponent } from './src/app/app.component';
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { BlogService } from './src/app/pages/blog/services/blog.service';
import { IPost } from './src/app/pages/blog/models/IPost.model';
import { writeFile } from 'fs/promises';

async function prerender() {
    const app = await bootstrapApplication(AppComponent, {
        providers: [
            provideClientHydration(),
            provideHttpClient(),
            BlogService
        ]
    });

    const blogService = app.injector.get(BlogService);
    const posts: IPost[] = await new Promise(resolve => {
        blogService.getPosts().subscribe(p => resolve(p));
    });

    const routes = ['/', '/sobre-mi', '/blog'];
    posts.forEach(post => {
        routes.push(`/blog/${post.slug}`);
    });

    await writeFile('routes.txt', routes.join('\n'));

    console.log('Generated routes.txt for prerendering');
    await app.destroy();
    process.exit(0);
}

prerender();
