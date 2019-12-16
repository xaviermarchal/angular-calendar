# angular-calendar : An angular calendar SPA

## Table of contents
* [Description](#description)
* [Interactions](#interactions)
* [User Limitations](#user-limitations)
* [Technologies](#technologies)
* [Launch](#launch)
* [Code architecture](#architecture)

## Description

Angular Calendar is a project whose goal is to develop a single-page application that presents a weekly calendar, with Angular.
This project is a view of the days of the week, where the user can see any events he created during that week. 

The user can change the selected date and display any week he wants. The displayed events will be updated depending on the days.

The user can create a new event, by clicking on the calendar. A dialog will open with a default event set to one hour meeting, where he clicked. The user can also create a new event by clicking on the create button located at the top left on the application. The default event will be set at the current hour, one hour meeting.

The created event is always depending of the user selected. By default, there are only three users logged (Xavier, Corentin and Gaultier)

The user can edit a created event, and changed start date and end date, title, color. He can also delete the event.

## Interactions

The application is a unique weekly calendar view representing all the meeting of the user Xavier.

![Calendar view](https://github.com/xaviermarchal/angular-calendar/blob/master/src/assets/readme/calendar.png)

The application enables to create new events thanks to a create button, or selecting a already created event, and edit it.

![Creation Form](https://github.com/xaviermarchal/angular-calendar/blob/master/src/assets/readme/event-create.png)


## User Limitations :
The calendar being created in a given time of one week, it present at the present several user limitations :

* No check is done on start date and end date. Please enter a correct date.
* No Undo/Redo is possible. If you deleted an event by mistake, you can created it again.
* No keyboard actions are developped.
* No basic interaction, like click/extend new event, preview of new event, drag and drop of event.

## Technologies

angular-calendar is created with:
* Angular CLI: 8.3.20
* Node: 12.13.0
* OS: win32 x64
* Angular: 8.2.14

Package version
* @angular-devkit/architect          0.803.20
* @angular-devkit/build-angular      0.803.20
* @angular-devkit/build-optimizer    0.803.20
* @angular-devkit/build-webpack      0.803.20
* @angular-devkit/core               8.3.20
* @angular-devkit/schematics         8.3.20
* @angular/cdk                       8.2.3
* @angular/cli                       8.3.20
* @angular/material                  8.2.3
* @angular/material-moment-adapter   8.2.3
* @ngtools/webpack                   8.3.20
* @schematics/angular                8.3.20
* @schematics/update                 0.803.20
* momentjs							 2.24.0
* rxjs                               6.4.0
* typescript                         3.5.3
* webpack                            4.39.2

angular-calendar notably get advantage of [Material Angular](https://material.angular.io/) for UI, or [MomentJS](https://momentjs.com/)  for storing dates.

Here is a non exhasutive list of libraries used :
* MomentJS
* Material Angular : Radio Box, Card, Date picker etc. 
* Reactive Forms
* RxJS

## Launch

To run this project, install it locally using npm:

```
# Clone this repository
$ git clone https://github.com/xaviermarchal/angular-calendar.git
# Go into the repository
$ cd angular-calendar
$ npm install
$ ng serve
```

The project will be usable on http://localhost:4200/

## Code architecture

This application, build under Angular with Reduc pattern, considers three differents models : 
* selectedDate : the current date by default, stored with MomentJS. The user can change this date with all pickers provided.
* Calendar Event : events associated to a day in the calendar
* Use : User management

```
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

export class User {
    constructor(
        public id: string,
        public fname: string,
        public name: string,
        public color: string,
        public selected = false
    ) {}
}
```

All these data are stored in a global store, using ngrx :
```
// use entities for managing events and users updates
export interface AppState {
    readonly events: CalendarEventsState;
    readonly selectedDate: moment.Moment;
    readonly users: UserState;
}
```

Actions and reducers are available in the folder [Store](https://github.com/xaviermarchal/angular-calendar/tree/master/src/app/store)

This applications embeds seven different components :

* Three main components for the global view : 

   -[Nav-Bar](https://github.com/xaviermarchal/angular-calendar/tree/master/src/app/components/nav-bar) : navigation bar. This component provides actions on the selected date, with possibility to reset the date to today, or swith to next/previous week.
   
   -[Side-Bar](https://github.com/xaviermarchal/angular-calendar/tree/master/src/app/components/side-bar) : left side bar. This component enables to change the selected date with a date Picker. You can also create a new event and switch the selected user whom the application is displaying his events.
   
   -[Calendar](https://github.com/xaviermarchal/angular-calendar/tree/master/src/app/components/calendar) : Main composent displayed the calendar. This composant acts like a container, managing the store and giving informations to sub components to be displayed. For now, this composant fixes the current viewType to 'week' type, or fixes the hours to be displayed ( this could be an improvement of the app.).

* Three components used by calendar

   -[day-view](https://github.com/xaviermarchal/angular-calendar/tree/master/src/app/components/day-view) : The day view. This components renders a view for the current day, and its list of all events associated to the day. Each event is displayed thanks to a CSS padding system. Each hour represent around 40px (fixed value, but could be changed in a near future). The day view launches the dialog form for creating events, and emit these events once they are created/edited to its parent.
   
   -[calendar-event](https://github.com/xaviermarchal/angular-calendar/tree/master/src/app/components/calendarevent) : The event view. This component display a colored box given the event information (color, title, dates).
   
   -[event-form](https://github.com/xaviermarchal/angular-calendar/tree/master/src/app/components/event-form) : the form component for creating/editing an event. Given an event, display by default the event values in the form fields.

* One component used by side-bar

   -[User](https://github.com/xaviermarchal/angular-calendar/tree/master/src/app/components/users) : This composant provides a radio group view of the user list available. When a user is selected, it raised an event to inform its parents that a selection change has been done.
