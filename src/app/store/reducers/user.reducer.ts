import { EntityAdapter, createEntityAdapter  } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

import { UserState } from './../states/app.state';
import { User } from './../../models/user.model';
import * as UserActions from './../actions/user.action';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();
export const initialUserState: UserState = adapter.getInitialState( {
    ids: ['0', '1', '2'],
    entities : {
        0: {id: '0', fname: 'Xavier', name: 'Marchal', color: '#FF0000', selected: true },
        1: {id: '1', fname: 'Corentin', name: 'Urban Linker', color: '#00FF00', selected: false },
        2: {id: '2', fname: 'Gaultier', name: 'Romon', color: '#0000FF', selected: false }
    }
});

export function userReducer(state = initialUserState, action: UserActions.Actions): UserState {
    switch (action.type) {
        case UserActions.UserActionTypes.ADD_USER:
            return adapter.addOne(action.payload.user, state);
        case UserActions.UserActionTypes.UPDATE_USER:
            return adapter.updateOne(action.payload.user, state);
        default:
            return state;
    }
}

export const getUsersState = createFeatureSelector<UserState>('users');
export const {
    selectAll
} = adapter.getSelectors(getUsersState);

