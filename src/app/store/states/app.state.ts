import { EntityState } from '@ngrx/entity';

import { User } from './../../models/user.model';
import { CalendarEvent } from './../../models/calendarEvent.model';
import * as moment from 'moment';

export interface CalendarEventsState extends EntityState<CalendarEvent> {}
export interface UserState extends EntityState<User> {}

export interface AppState {
    readonly events: CalendarEventsState;
    readonly selectedDate: moment.Moment;
    readonly users: UserState;
}
