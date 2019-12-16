import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import * as moment from 'moment';

export enum DateActionTypes {
   RESET_DATE = '[DATE] Reset selected date',
   UPDATE_DATE = '[DATE] Update selected date',
}

export class ResetDate implements Action {
    readonly type = DateActionTypes.RESET_DATE;
    constructor( ) {}
}
export class UpdateDate implements Action {
    readonly type = DateActionTypes.UPDATE_DATE;
    constructor( public payload: moment.Moment ) {}
}

export type Actions = UpdateDate | ResetDate;
