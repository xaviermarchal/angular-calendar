import { User } from './../../models/user.model';
import { CalendarEvent } from './../../models/calendarEvent.model';
import { AppState } from './../../store/states/app.state';
import { Store, createSelector } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as EventsActions from './../../store/actions/calendarEvent.actions';
import * as fromEvents from './../../store/reducers/calendarevent.reducer';
import * as fromUsers from './../../store/reducers/user.reducer';
import { EventFormComponent } from '../event-form/event-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  selectedDate: moment.Moment;
  events: CalendarEvent[] = [];
  users: User[];

  viewType = 'week';
  hoursList: string[] = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'];
  dayList: number[] = [0, 1, 2, 3, 4, 5, 6];
  gridHeightPixel = 29;
  constructor(private store: Store<AppState>, public dialog: MatDialog) {}
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
  onDeleteEventReceived(event: CalendarEvent) {
    this.store.dispatch(new EventsActions.RemoveCalendarEvent( { id: event.id }));
  }
  onSaveEventReceived(event: CalendarEvent) {
    this.store.dispatch(new EventsActions.UpdateCalendarEvent( { event : { id: event.id, changes: event }}));
  }
  onDayClickEvent( mouseClick: MouseEvent, dayIdx: number) {
    // Compute the hour clicked base on mouse event. 1H equal gridHeightPixel
    const hour = mouseClick.offsetY / this.gridHeightPixel;
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

}
