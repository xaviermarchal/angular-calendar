import { AppState } from './../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from './../event-form/event-form.component';
import { Update } from '@ngrx/entity';

import * as DateActions from './../../store/actions/selectedDate.actions';
import * as UserActions from './../../store/actions/user.action';
import * as EventsActions from './../../store/actions/calendarEvent.actions';

import * as moment from 'moment';
import { User } from './../../models/user.model';
import { CalendarEvent } from './../../models/calendarEvent.model';

import * as fromUsers from './../../store/reducers/user.reducer';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  selectedDate: moment.Moment;
  users: User[];
  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  onCreateEvent() {
    const newId = moment().toString();
    const newTitle = '';
    const newStartDate = moment().minute(0).second(0);
    const newEndDate = newStartDate.clone().add(1, 'h');
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
  onChangeDate(newDate: moment.Moment) {
    this.store.dispatch( new DateActions.UpdateDate( newDate ) );
  }

  onChangeUserSelection(user: User) {
    const updates: Update<User> = { id: user.id , changes: { selected: !user.selected }};
    this.store.dispatch( new UserActions.UpdateUser( {user: updates} ));
  }

  ngOnInit() {
    this.store.select('selectedDate').subscribe(mom => this.selectedDate = mom);
    this.store.select(fromUsers.selectAll).subscribe(res => this.users = res);
  }
}
