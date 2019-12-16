import * as DateActions from './../actions/selectedDate.actions';
import * as moment from 'moment';

export const initialState = moment().hours(0).minutes(0).seconds(0);

export function selectedDateReducer( state = initialState, action: DateActions.Actions) {
    switch (action.type) {
        case DateActions.DateActionTypes.UPDATE_DATE:
            return action.payload;
        case DateActions.DateActionTypes.RESET_DATE:
            return moment().hours(0).minutes(0).seconds(0);
        default:
            return state;
    }
}
