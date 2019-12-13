import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-block',
  templateUrl: './calendar-block.component.html',
  styleUrls: ['./calendar-block.component.scss']
})
export class CalendarBlockComponent implements OnInit {
  @Input() dayNum: string;
  @Input() dayName: string;
  @Input() monthNum: number;
  @Input() header: string;
  
  @Input() col1: string;
  @Input() col2: string;
  @Input() col3: string;
  @Input() col4: string;
  @Input() col5: string;
  @Input() col6: string;
  @Input() col7: string;
  @Input() col8: string;
  @Input() col9: string;
  
  constructor() {}

  ngOnInit() {
  }

}
