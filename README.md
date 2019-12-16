# angular-calendar : An angular calendar SPA

## Table of contents
* [Description](#description)
* [User Limitations](#user-limitations)
* [Technologies](#technologies)
* [Launch](#launch)

## Description

Angular Calendar is a project whose goal is to develop a single-page application that presents a weekly calendar, with Angular.
This project is a view of the days of the week, where the user can see any events he created during that week. 

The user can change the selected date and display any week he wants. The displayed events will be updated depending on the days.

The user can create a new event, by clicking on the calendar. A dialog will open with a default event set to one hour meeting, where he clicked. The user can also create a new event by clicking on the create button located at the top left on the application. The default event will be set at the current hour, one hour meeting.

The created event is always depending of the user selected. By default, there are only three users logged (Xavier, Corentin and Gaultier)

The user can edit a created event, and changed start date and end date, title, color. He can also delete the event.

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


