import { AppState } from './../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as DateActions from './../../store/actions/selectedDate.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  selectedDate: moment.Moment;
  constructor(private store: Store<AppState>) {
  }
  resetDate() {
    this.store.dispatch(new DateActions.ResetDate());
  }
  adjustDate(delay: number) {
    const newDate = this.selectedDate.clone().add(delay, 'days');
    this.store.dispatch(new DateActions.UpdateDate( newDate ) );
  }
  formatDate(mom: moment.Moment) {
    return mom.format('MMMM YYYY');
  }
  ngOnInit() {
    this.store.select('selectedDate').subscribe(mom => this.selectedDate = mom);
  }

}
