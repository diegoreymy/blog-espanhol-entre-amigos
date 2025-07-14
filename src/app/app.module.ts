import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })], providers: [
        Title,
        provideHttpClient(withInterceptorsFromDi()),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideMessaging(() => getMessaging())
    ] })
export class AppModule { }
