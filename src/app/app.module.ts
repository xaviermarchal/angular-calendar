import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { StoreModule } from '@ngrx/store';
import { eventReducer } from './store/reducers/calendarevent.reducer';
import { userReducer } from './store/reducers/user.reducer';
import { selectedDateReducer } from './store/reducers/selectedDate.reducer';

import { UsersComponent } from './components/users/users.component';
import { DayViewComponent } from './components/day-view/day-view.component';
import { CalendareventComponent } from './components/calendarevent/calendarevent.component';
import { EventFormComponent } from './components/event-form/event-form.component';

import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ColorPickerModule } from 'ngx-color-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SideBarComponent,
    NavBarComponent,
    UsersComponent,
    DayViewComponent,
    CalendareventComponent,
    EventFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    ColorPickerModule,
    NgxMaterialTimepickerModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
        events : eventReducer,
        selectedDate : selectedDateReducer,
        users : userReducer
    })
  ],
  entryComponents: [
    EventFormComponent
  ],
  providers: [
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
