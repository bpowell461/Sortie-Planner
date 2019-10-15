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
  /*getDays (): Observable<calDay[]> {
    return this.http.get<calDay[]>(this.apiUrl+'calendar').pipe(map(calDays => JSON.parse(JSON.stringify(calDays))));
  };*/
}

interface calDay {
  calNum: number;
  calName: string;
}