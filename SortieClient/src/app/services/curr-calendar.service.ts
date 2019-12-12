import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CurrCalendarService {
  private apiUrl = 'http://localhost:8000/'; // Change this out later

  constructor(private http: HttpClient) { }
  
  getDays():Promise<void | calDay[]> {
    return this.http
    .get('http://localhost:8000/'+'calendar')
    .toPromise()
    .then(response => 
    {     
      return response as calDay[];
    });
    //return response// JSON.parse(JSON.stringify(response));
  };

  getYear():Promise<void | calMonths[]> {
    return this.http
    .get('http://localhost:8000/' + 'cal')
    .toPromise()
    .then(response =>
    {
      console.log(response);
      return response as calMonths[];  
    })
  }

  getSorties():Promise<void | sortie[]> {
    return this.http
    .get('http://localhost:8000/' + 'test')
    .toPromise()
    .then(response => 
    {
      console.log(response);
      return response as sortie[];
    })
  }

  /*getDays (): Observable<calDay[]> {
    return this.http.get<calDay[]>(this.apiUrl+'calendar').pipe(map(calDays => JSON.parse(JSON.stringify(calDays))));
  };*/
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

interface calDay {
  calNum: number;
  calName: string;
}

interface sortie {
  monthNum: number;
  dayNum: number;
  dayName: string;
  squadName: string;
}