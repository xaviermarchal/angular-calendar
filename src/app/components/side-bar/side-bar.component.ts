import { AppState } from './../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { Update } from '@ngrx/entity';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from './../event-form/event-form.component';

import * as DateActions from './../../store/actions/selectedDate.actions';
import * as UserActions from './../../store/actions/user.action';
import * as EventsActions from './../../store/actions/calendarEvent.actions';

import * as moment from 'moment';
import { User } from './../../models/user.model';
import { CalendarEvent } from './../../models/calendarEvent.model';

import * as fromUsers from './../../store/reducers/user.reducer';
import { CalendarOptions } from 'src/app/models/calendarOptions.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input() options ? = new CalendarOptions();

  selectedDate: moment.Moment;
  users: User[];
  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit() {
    this.store.select('selectedDate').subscribe(mom => this.selectedDate = mom);
    this.store.select(fromUsers.selectAll).subscribe(res => this.users = res);
  }
  // Events managements

  // Create button : new event, 1h default
  onCreateEvent() {
    const newId = moment().toString();
    const newTitle = this.options.events.defaultTitle;
    const newStartDate = moment().minute(0).second(0);
    const newEndDate = newStartDate.clone().add( this.options.events.defaultDuration, 'h');
    const user: User = this.users.filter( u => u.selected )[0];

    const newEv = new CalendarEvent(newId, newTitle, newStartDate, newEndDate, user.id, user.color);
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: this.options.dialogFormWidth,
      data: { event: newEv }
    });

    dialogRef.componentInstance.save.subscribe( ( evt: CalendarEvent) => {
      this.store.dispatch( new EventsActions.AddCalendarEvent( {event: evt} ));
    });

  }
  // Date picker
  onChangeDate(newDate: moment.Moment) {
    this.store.dispatch( new DateActions.UpdateDate( newDate ) );
  }
  // users radio group : dispatch all changes done on user selection
  onChangeUserSelection(usersUpdate: Update<User>[] ) {
    this.store.dispatch( new UserActions.UpdateUsers( { updates : usersUpdate } ));
  }
}
