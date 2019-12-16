import {User} from './user.model';
import * as moment from 'moment';

export class CalendarEvent {
    constructor(
        public id: string,
        public title: string,
        public startDate: moment.Moment,
        public endDate: moment.Moment,
        public userId: string,
        public color?: string
    ) {}
}
