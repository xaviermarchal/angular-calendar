import { EntityAdapter, createEntityAdapter  } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

import { CalendarEvent } from './../../models/calendarEvent.model';
import { CalendarEventsState } from './../states/app.state';
import * as CalendarEventActions from './../actions/calendarEvent.actions';
import * as moment from 'moment';

export const adapter: EntityAdapter<CalendarEvent> = createEntityAdapter<CalendarEvent>();

const currDay = moment().minute(0).second(0);
export const initialCalendarEventState: CalendarEventsState = adapter.getInitialState( {
  ids: ['0', '1', '2'],
  entities: {
      0: {
          id: '0',
          title: 'My Meeting',
          startDate: currDay.clone().hour(14),
          endDate: currDay.clone().hour(16),
          userId: '0',
          color : '#FF0000'
        },
      1: {
          id: '1',
          title: 'My other Meeting',
          startDate: currDay.clone().date(14).hour(10),
          endDate: currDay.clone().date(14).hour(12),
          userId: '1',
          color : '#FF0000'
        },
      2: {
          id: '2',
          title: 'My BIG meeting',
          startDate: currDay.clone().date(13).hour(12),
          endDate: currDay.clone().date(13).hour(16),
          userId: '0',
          color : '#FFFF00'
        }
  }
});

export function eventReducer( state = initialCalendarEventState, action: CalendarEventActions.Actions): CalendarEventsState {
  switch (action.type) {
    case CalendarEventActions.CalendarEventActionTypes.ADD_CALENDAR_EVENT:
        return adapter.addOne(action.payload.event, state);
      case CalendarEventActions.CalendarEventActionTypes.REMOVE_CALENDAR_EVENT:
        return adapter.removeOne(action.payload.id, state);
      case CalendarEventActions.CalendarEventActionTypes.UPDATE_CALENDAR_EVENT:
        return adapter.updateOne(action.payload.event, state);
      default:
        return state;
  }
}

export const getCalendarEventsState = createFeatureSelector<CalendarEventsState>('events');
export const {
    selectAll
} = adapter.getSelectors(getCalendarEventsState);


