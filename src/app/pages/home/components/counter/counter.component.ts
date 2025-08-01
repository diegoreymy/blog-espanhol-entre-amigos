import { Component } from '@angular/core';

import { faChalkboardTeacher, faComment, faUserGraduate, faGrinTears, faInfinity } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.scss'],
    standalone: false
})
export class CounterComponent {

  icons = {
    faChalkboardTeacher,
    faComment,
    faUserGraduate,
    faGrinTears,
    faInfinity
  };
}
