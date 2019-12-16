import { Update } from '@ngrx/entity';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from './../../models/user.model';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  @Output() updateUsers = new EventEmitter< Update<User>[] >();
  @Input() users: User[];

  onChangeSelection(changeEvent: MatCheckboxChange, user: User) {
    const updates: Update<User>[] = [];
    // Generic change of all selected values
    const changedUserSelection = this.users.filter(el => el.selected)
        .map( x => updates.push( { id: x.id , changes: { selected: false} } ));

    // push selected change
    updates.push( { id: user.id , changes: { selected: true} } );
    this.updateUsers.emit(updates);
  }
}
