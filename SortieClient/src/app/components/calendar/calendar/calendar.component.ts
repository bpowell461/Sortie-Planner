import { Component, OnInit } from '@angular/core';
import { CurrCalendarService } from 'src/app/services/curr-calendar.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  weeks = [[], [], [], [], []]
  currDays: calDays[];
  flag:boolean = false;
  counter:number=0;

  constructor(private calService: CurrCalendarService) { }
  // Add function here to get the data for each day

  ngOnInit() {
    this.calService
    .getDays()
    .then((cal: calDays[]) => {
      this.currDays = cal.map((day) => {
        return day;
      })
    })
  }

  trackDay(index, day) {
    return day;
  }

  trackWeek(index, week) {
    return week;
  }

  test() {
    this.flag=true;
    for(var i=this.counter*7;i<this.counter*7+7;i++)
    {
      if(this.currDays[i] === undefined)
        break;
      this.weeks[this.counter].push(this.currDays[i]);
      if((i+1)%7 == 0)
        this.counter += 1;
    }
  }
}

interface calDays {
  calNum: number;
  calName: string;
}