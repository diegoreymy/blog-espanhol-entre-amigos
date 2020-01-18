import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { CounterComponent } from './components/counter/counter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CounterDirective } from './components/counter/directives/counter.directive';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewsListComponent } from './components/reviews/components/reviews-list/reviews-list.component';
import { ReviewsCardComponent } from './components/reviews/components/reviews-card/reviews-card.component';


@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    CounterComponent,
    CounterDirective,
    ReviewsComponent,
    ReviewsListComponent,
    ReviewsCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
  ]
})
export class HomeModule { }
