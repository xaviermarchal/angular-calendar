import { AppState } from './../../store/states/app.state';
import { Store, createSelector } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { EventFormComponent } from '../event-form/event-form.component';
import { MatDialog } from '@angular/material/dialog';

import { User } from './../../models/user.model';
import * as moment from 'moment';
import { CalendarOptions } from './../../models/calendarOptions.model';
import { CalendarEvent } from './../../models/calendarEvent.model';

import * as EventsActions from './../../store/actions/calendarEvent.actions';
import * as fromEvents from './../../store/reducers/calendarevent.reducer';
import * as fromUsers from './../../store/reducers/user.reducer';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  // renderer options
  // notably hour list, day list, grid pixel sixe
  @Input() options ? = new CalendarOptions();

  selectedDate: moment.Moment;
  events: CalendarEvent[] = [];
  users: User[];



  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit() {
    this.store.select('selectedDate').subscribe(mom => this.selectedDate = mom);

    const selectEventsForCalendar = createSelector(
      fromUsers.selectAll,
      fromEvents.selectAll,
      (users: User[], events: CalendarEvent[]) => {
        this.users = users;
        return events.filter( ev => users.filter( el => el.id === ev.userId )[0].selected );
      }
    );
    this.store.select(selectEventsForCalendar).subscribe(res => this.events = res);
  }
  // Auxiliary function for formatting et get for readability
  formatDay(dayIdx: number, formatType: string) {
    return this.getDayMoment(dayIdx).format(formatType);
  }
  getDayMoment(dayIdx: number) {
    const currentDayIdx = this.selectedDate.day();
    const currIdx = (currentDayIdx + 6) % 7;
    return this.selectedDate.clone().add(dayIdx - currIdx, 'days');
  }
  getDayColor(dayIdx: number) {
    const currIdx = ( this.selectedDate.day() + 6 ) % 7;
    return dayIdx  === currIdx ? 'primary' : 'basic';
  }
  getDayEvents(dayIdx: number) {
    const beginningOfDay = this.getDayMoment(dayIdx);
    const endOfDay = this.getDayMoment(dayIdx + 1);
    const evs = this.events.filter( el => el.startDate.isBefore( endOfDay ) && el.endDate.isAfter ( beginningOfDay ));
    return evs;
  }

  // Events managements from children or click
  onDeleteEventReceived(event: CalendarEvent) {
    this.store.dispatch(new EventsActions.RemoveCalendarEvent( { id: event.id }));
  }
  onSaveEventReceived(event: CalendarEvent) {
    this.store.dispatch(new EventsActions.UpdateCalendarEvent( { event : { id: event.id, changes: event }}));
  }
  onDayClickEvent( mouseClick: MouseEvent, dayIdx: number) {
    // if click on calendar event has been done,an dialog is already opened
    if ( this.dialog.openDialogs.length !== 0 ) { return; }

    // Compute the hour clicked base on mouse event. 1H equal gridHeightPixel
    const hour = mouseClick.offsetY / this.options.hourPixelSize;
    // count starting hour, 30 min by 30 min, we compare round and floor to know the closest
    const minute = Math.floor(hour) !== Math.round(hour) ? 30 : 0;

    const startMom = this.getDayMoment(dayIdx).hour(hour).minute(minute);
    const newId = moment().toString();
    const newTitle = '';
    const newStartDate = startMom;
    const newEndDate = startMom.clone().add(2, 'h');
    const user: User = this.users.filter( u => u.selected )[0];

    const newEv = new CalendarEvent(newId, newTitle, newStartDate, newEndDate, user.id, user.color);

    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '320px',
      data: { event: newEv }
    });

    dialogRef.componentInstance.save.subscribe( ( evt: CalendarEvent) => {
      this.store.dispatch( new EventsActions.AddCalendarEvent( {event: evt} ));
    });
  }
}
