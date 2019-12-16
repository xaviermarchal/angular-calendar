import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from './../../models/calendarEvent.model';
import { User } from './../../models/user.model';

import * as moment from 'moment';
import { CalendarOptions } from 'src/app/models/calendarOptions.model';

@Component({
  selector: 'app-calendarevent',
  templateUrl: './calendarevent.component.html',
  styleUrls: ['./calendarevent.component.css']
})
export class CalendareventComponent {

  @Input() event: CalendarEvent;
  @Input() options?: CalendarOptions = new CalendarOptions();
  constructor() { }

  getStartHour() {
    return this.event.startDate.format('HH:mm');
  }
  getEndHour() {
    return this.event.endDate.format('HH:mm');
  }
}
