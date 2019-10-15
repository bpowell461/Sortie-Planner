import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarBlockComponent } from './components/calendar/calendar-block/calendar-block.component';
import { CalendarComponent } from './components/calendar/calendar/calendar.component';
import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  declarations: [
    AppComponent,
    CalendarBlockComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularDraggableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
