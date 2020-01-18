import { Component, OnInit } from '@angular/core';

import { faChalkboardTeacher, faComment, faUserGraduate, faGrinTears, faInfinity } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  icons = {
    faChalkboardTeacher,
    faComment,
    faUserGraduate,
    faGrinTears,
    faInfinity
  };
  constructor() { }

  ngOnInit() {
  }

}
