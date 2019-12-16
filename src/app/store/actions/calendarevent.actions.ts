import { CalendarEvent } from './../../models/calendarEvent.model';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export enum CalendarEventActionTypes {
    ADD_CALENDAR_EVENT = '[EVENT] Add Calendar Event',
    REMOVE_CALENDAR_EVENT = '[EVENT] Remove Calendar Event',
    UPDATE_CALENDAR_EVENT = '[EVENT] Update Calendar Event'
  }

export class AddCalendarEvent implements Action {
    readonly type = CalendarEventActionTypes.ADD_CALENDAR_EVENT;
    constructor( public payload: {event : CalendarEvent} ){}
}
export class UpdateCalendarEvent implements Action {
    readonly type = CalendarEventActionTypes.UPDATE_CALENDAR_EVENT;
    constructor( public payload: { event: Update<CalendarEvent>} ){}
}
export class RemoveCalendarEvent implements Action {
    readonly type = CalendarEventActionTypes.REMOVE_CALENDAR_EVENT;
    constructor( public payload: { id: string }){}
}

export type Actions = AddCalendarEvent | RemoveCalendarEvent | UpdateCalendarEvent;
