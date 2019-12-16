import { EntityAdapter, createEntityAdapter  } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

import { CalendarEvent } from './../../models/calendarEvent.model';
import { CalendarEventsState } from './../states/app.state';
import * as CalendarEventActions from './../actions/calendarEvent.actions';
import * as moment from 'moment';

export const adapter: EntityAdapter<CalendarEvent> = createEntityAdapter<CalendarEvent>();

const currDay = moment().minute(0).second(0);
export const initialCalendarEventState: CalendarEventsState = adapter.getInitialState( {
  ids: ['0', '1', '2', '3', '4', '5', '6'],
  entities: {
      0: {
          id: '0',
          title: 'Review Angular',
          startDate: currDay.clone().date(17).hour(14),
          endDate: currDay.clone().date(17).hour(16),
          userId: '0',
          color : '#FF0000'
        },
      1: {
          id: '1',
          title: 'Urban Linker review',
          startDate: currDay.clone().date(18).hour(10),
          endDate: currDay.clone().date(18).hour(12),
          userId: '1',
          color : '#00FF00'
        },
      2: {
          id: '1',
          title: 'Pair programming',
          startDate: currDay.clone().date(18).hour(10),
          endDate: currDay.clone().date(18).hour(12),
          userId: '0',
          color : '#FF0000'
        },
      3: {
          id: '3',
          title: 'Training Angular',
          startDate: currDay.clone().date(20).hour(8),
          endDate: currDay.clone().date(20).hour(16),
          userId: '0',
          color : '#FFFF00'
        },
        4: {
            id: '4',
            title: 'Review Calendar Xavier',
            startDate: currDay.clone().date(17).hour(8),
            endDate: currDay.clone().date(18).hour(18),
            userId: '2',
            color : '#0080FF'
          },
        5: {
            id: '5',
            title: 'Review Calendar Xavier - Suite',
            startDate: currDay.clone().date(20).hour(8),
            endDate: currDay.clone().date(20).hour(18),
            userId: '2',
            color : '#0080FF'
          },
        6: {
            id: '6',
            title: 'NOEL',
            startDate: currDay.clone().date(24).hour(18),
            endDate: currDay.clone().date(24).hour(22),
            userId: '0',
            color : '#00FFFF'
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
