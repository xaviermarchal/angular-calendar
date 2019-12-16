import { CalendarEvent } from './../../models/calendarEvent.model';
import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  @Output() save = new EventEmitter<CalendarEvent>();
  @Output() delete = new EventEmitter<CalendarEvent>();

  public form: FormGroup = new FormGroup({
    title: new FormControl('new event'),
    startdate : new FormControl( moment() ),
    enddate : new FormControl( moment() ),
    color : new FormControl('#FF0000')
  });
  public event: CalendarEvent;
  constructor(
    public dialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.event = data.event;
      this.form.setValue({
        title: this.event.title,
        startdate : this.event.startDate.format('YYYY-MM-DD[T]HH:mm'),
        enddate : this.event.endDate.format('YYYY-MM-DD[T]HH:mm'),
        color : this.event.color
      });
  }

  // setDeleteButtonStyle() {
  //   return this.isDeleteVisible ? { display: 'none' } : {};
  // }

  onDeleteEvent( mouseclick: any ) {
    this.dialogRef.afterClosed().subscribe(() => {
      this.delete.emit(this.event);
    });
    this.dialogRef.close();
  }
  onSaveEvent( mouseclick: any ) {
    const savedEvent = this.event;
    savedEvent.color = this.form.get('color').value;
    savedEvent.startDate = moment(this.form.get('startdate').value);
    savedEvent.endDate = moment(this.form.get('enddate').value);
    savedEvent.title = this.form.get('title').value !== '' ? this.form.get('title').value : '(no title)';

    this.dialogRef.afterClosed().subscribe(() => {
      this.save.emit(savedEvent);
    });
    this.dialogRef.close();
  }
}
