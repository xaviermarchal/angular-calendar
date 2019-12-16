import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from './../../models/calendarEvent.model';
import { User } from './../../models/user.model';

import * as moment from 'moment';

@Component({
  selector: 'app-calendarevent',
  templateUrl: './calendarevent.component.html',
  styleUrls: ['./calendarevent.component.css']
})
export class CalendareventComponent {

  @Input() event: CalendarEvent;
  viewType = 'extended';
  constructor() { }

  getStartHour() {
    return this.event.startDate.format('HH:mm');
  }
  getEndHour() {
    return this.event.endDate.format('HH:mm');
  }
}
