import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { NgModule, APP_ID } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

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
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        CommonModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })], providers: [
        Title,
        Meta,
        { provide: DOCUMENT, useValue: document },
        provideHttpClient(withInterceptorsFromDi()),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideMessaging(() => getMessaging()),
        { provide: APP_ID, useValue: 'serverApp' }
    ] })
export class AppModule { }
