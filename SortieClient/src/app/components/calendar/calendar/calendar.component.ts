import { Component, OnInit, ElementRef, Query } from '@angular/core';
import { CurrCalendarService } from 'src/app/services/curr-calendar.service';
import { ViewChildren, QueryList } from '@angular/core';
import { CalendarBlockComponent } from '../calendar-block/calendar-block.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EMLINK } from 'constants';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"]
  year: calMonths[];
  sorties: sortie[];
  flag:boolean = false;
  counter:number = 0;
  
  @ViewChildren('months') components: QueryList<ElementRef>;
  @ViewChildren('days') componentsDays: QueryList<ElementRef>;

  constructor(private calService: CurrCalendarService) { }

  ngOnInit() {
    this.calService
    .getYear()
    .then((cal: calMonths[]) => {
      this.year = cal.map((year) => {
        return year;
      })
    })
  }

  ngAfterViewInit() {}

  trackDay(index, day) {
    return day;
  }

  trackWeek(index, week) {
    return week;
  }

  trackMonth(index, month) {
    return month;
  }

  test()
  {
    this.flag = true;
  }

  /* Generate the sorties */
  generate()
  {
    this.calService
    .getSorties()
    .then((sor: sortie[]) => {
      this.sorties = sor.map((sorties) => {
        return sorties;
      })
      
      /*this.componentsDays.toArray().forEach(element => {
        console.log(element.dayNum);
        //console.log(element.nativeElement.getAttribute("day"));
        //console.log(element.nativeElement.getAttribute("dayNum"));
      });*/
      //for(let i = 0; i < this.sorties.length; ++i)
      this.sorties.forEach(s => {
        this.componentsDays.toArray().forEach(d => {
          //console.log(d.dayNum);
          if(+d.dayNum == s.day && d.monthNum-1 == s.month)// && d.monthNum == s.monthNum)
          {
            //d.nativeElement.querySelector(".days-class").insertAdjacentHTML("beforeend", '<div>Squad</div>');
            //console.log(d.col1);
            if(d.col1 == undefined)
              d.col1 = s.squad.replace("Squad", "")
            if(d.col2 == undefined)
              d.col2 = s.squad.replace("Squad", "")
            if(d.col3 == undefined)
              d.col3 = s.squad.replace("Squad", "")
            if(d.col4 == undefined)
              d.col4 = s.squad.replace("Squad", "")
            if(d.col5 == undefined)
              d.col5 = s.squad.replace("Squad", "")
            if(d.col6 == undefined)
              d.col6 = s.squad.replace("Squad", "")
            if(d.col7 == undefined)
              d.col7 = s.squad.replace("Squad", "")
            if(d.col8 == undefined)
              d.col8 = s.squad.replace("Squad", "")
            if(d.col9 == undefined)
              d.col9 = s.squad.replace("Squad", "")
          }
        });
      });
    });
  }

  /* Go to the next month */
  nextMonth()
  {
    var flag:boolean = false; // Flag to check when to set the next month
    var finished:boolean = false;
    this.components.toArray().forEach(m => {
      if(finished != true)
      {
        if(flag)
        {
          m.nativeElement.hidden = false;
          finished = true;
        }

        if(m.nativeElement.hidden == false && finished != true)
        {
          flag = true;
          m.nativeElement.hidden = true;
        }
      }
    })
  }
}

/* Have a visibility toggle for each month */
interface calDays {
  dayNum: number;
  monthNum: number;
  yearNum: number;
  dateObj: string;
  dayName: string;
  holiday: boolean;
  sorties: any[];
}

interface calWeeks {
  days: calDays[];
}
interface calMonths {
  weeks: calWeeks[];
}

interface sortie {
  monthNum: number;
  dayNum: number;
  dayName: string;
  squadName: string;
}