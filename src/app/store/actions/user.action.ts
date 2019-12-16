import { Action } from '@ngrx/store';
import { User } from './../../models/user.model';
import { Update } from '@ngrx/entity';

export enum UserActionTypes {
    ADD_USER = '[User] Add User',
    UPDATE_USER = '[User] Update User',
    UPDATE_USERS = '[User] Update Users'
}

export class AddUser implements Action {
    readonly type = UserActionTypes.ADD_USER;
    constructor( public payload: {user: User} ) {}
}
export class UpdateUser implements Action {
    readonly type = UserActionTypes.UPDATE_USER;
    constructor( public payload: { update: Update<User>} ) {}
}
export class UpdateUsers implements Action {
    readonly type = UserActionTypes.UPDATE_USERS;
    constructor( public payload: { updates: Update<User>[] } ) {}
}
export type Actions = AddUser | UpdateUser | UpdateUsers;
