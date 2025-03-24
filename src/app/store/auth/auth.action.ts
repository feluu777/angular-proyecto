import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { user } from '../../core/users/users';

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'set auth user': props<{ user: user }>(),
        'unset auth user': emptyProps(),
    },
});