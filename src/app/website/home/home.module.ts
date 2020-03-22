import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BannerComponent } from './components/banner/banner.component';
import { CounterComponent } from './components/counter/counter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CounterDirective } from './components/counter/directives/counter.directive';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewsListComponent } from './components/reviews/components/reviews-list/reviews-list.component';
import { ReviewsCardComponent } from './components/reviews/components/reviews-card/reviews-card.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactComponent } from './components/contact/contact.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutEspanholEntreAmigosComponent } from './components/about-espanhol-entre-amigos/about-espanhol-entre-amigos.component';


@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    CounterComponent,
    CounterDirective,
    ReviewsComponent,
    ReviewsListComponent,
    ReviewsCardComponent,
    AboutMeComponent,
    ContactComponent,
    AboutEspanholEntreAmigosComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
