import { Component, Input } from '@angular/core';
import { IReview } from '../../models/iReview.model';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss']
})
export class ReviewsListComponent {

  @Input() reviews: IReview[];
  @Input() loadAll: boolean;

}
