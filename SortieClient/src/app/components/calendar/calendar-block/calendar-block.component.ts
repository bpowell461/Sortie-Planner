import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-block',
  templateUrl: './calendar-block.component.html',
  styleUrls: ['./calendar-block.component.scss']
})
export class CalendarBlockComponent implements OnInit {
  @Input() dayNum: string;
  @Input() dayName: string;

  constructor() {
  }

  ngOnInit() {
  }

}
