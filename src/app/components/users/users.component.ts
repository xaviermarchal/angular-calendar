import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from './../../models/user.model';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  @Output() changeUserSelection = new EventEmitter<User>();
  @Input() users: User[];
  onChangeSelection(changeEvent: MatCheckboxChange, user: User) {
    this.changeUserSelection.emit(user);
  }
}
