import { Update } from '@ngrx/entity';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { User } from './../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  @Input() users: User[];
  @Output() updateUsers = new EventEmitter< Update<User>[] >();

  onChangeSelection(changeEvent: MatCheckboxChange, user: User) {
    const updates: Update<User>[] = [];
    // Generic change of all selected users : we push the change of selection to false
    const changedUserSelection = this.users.filter(el => el.selected)
        .map( x => updates.push( { id: x.id , changes: { selected: false } } ));

    // push selected change
    updates.push( { id: user.id , changes: { selected: true } } );
    this.updateUsers.emit(updates);
  }
}
