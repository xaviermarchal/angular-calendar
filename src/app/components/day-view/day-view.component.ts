import { CalendarOptions } from './../../models/calendarOptions.model';
import { CalendarEvent } from './../../models/calendarEvent.model';

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from './../event-form/event-form.component';

import * as moment from 'moment';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent {
  @Input() day: moment.Moment;
  @Input() events: CalendarEvent[];
  @Input() options?: CalendarOptions = new CalendarOptions();

  @Output() save = new EventEmitter<CalendarEvent>();
  @Output() delete = new EventEmitter<CalendarEvent>();

  constructor(public dialog: MatDialog) {}

  // Define CSS for each event, whose position depends on time start/end.
  setComputedEventStyle(ev: CalendarEvent) {
    const style = {
      'background-color': ev.color,
      position: 'absolute',
      width: 'inherit',
      top: this.computeEventTopTag(ev),
      height: this.computeEventHeightTag(ev)
    };
    return style;
  }
  // compute the top padding by multiplying the grid height per hour by the start time of the meeting.
  computeEventTopTag(ev: CalendarEvent) {
    const startingEvent = this.getStartingDateInDay(ev);
    const timeHour = startingEvent.diff(this.day, 'h', true);
    return Math.round(timeHour * this.options.hourPixelSize) + 'px';
  }
  computeEventHeightTag(ev: CalendarEvent) {
    const startingEvent = this.getStartingDateInDay(ev);
    const endEvent = this.getEndingDateInDay(ev);
    const timeHour = endEvent.diff(startingEvent, 'h', true);
    return Math.round(timeHour * this.options.hourPixelSize) + 'px';
  }
  // Getters for managing event that are on several days. For a given day, the starting day can be midnight
  // or the starting time of the event if the event is the same day
  getStartingDateInDay(ev: CalendarEvent) {
    return ev.startDate.isAfter(this.day, 'h' ) ? ev.startDate : this.day;
  }
  getEndingDateInDay(ev: CalendarEvent) {
    const nextDay = this.day.clone().add(1, 'd');
    return nextDay.isAfter(ev.endDate, 'h' ) ? ev.endDate : nextDay;
  }

  // Events management
  onEventClickEvent( mouseclick: any, ev: CalendarEvent) {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: this.options.dialogFormWidth,
      data: {
        event: ev,
        editionForm: true
      }
    });

    dialogRef.componentInstance.delete.subscribe(  ( evt: CalendarEvent) => {
      this.delete.emit(evt);
    });
    dialogRef.componentInstance.save.subscribe( ( evt: CalendarEvent) => {
      this.save.emit(evt);
    });
  }
}
