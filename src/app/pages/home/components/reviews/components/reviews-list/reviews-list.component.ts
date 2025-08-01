import { Component, Input } from '@angular/core';
import { IReview } from '../../models/iReview.model';

@Component({
    selector: 'app-reviews-list',
    templateUrl: './reviews-list.component.html',
    styleUrls: ['./reviews-list.component.scss'],
    standalone: false
})
export class ReviewsListComponent {

  @Input() reviews: IReview[];
  @Input() loadAll: boolean;
  seeMoreId: number;

  onSeeMoreId(id: number) {
    this.seeMoreId = id;
  }
}
