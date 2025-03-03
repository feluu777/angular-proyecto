import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { users } from '../../core/users/index';

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'set auth user': props<{ user: users }>(),
        'unset auth user': emptyProps(),
    },
});