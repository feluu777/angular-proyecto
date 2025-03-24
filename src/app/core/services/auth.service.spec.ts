import { AuthService } from './auth.services';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('AuthService', () => {
    let service: AuthService;
    let router: Router;
    let store: Store;

    beforeEach(() => {
        store = { select: () => of(true) } as unknown as Store;
        router = { navigate: () => { } } as unknown as Router;

        service = new AuthService(store, router);
    });

    it('Debería loguearse correctamente', () => {
        const payload = { Email: 'admin@gmail.com', Contraseña: '12345' };
        service.login(payload);
        service.authUser$.subscribe(user => {
            expect(user?.email).toBe('admin@gmail.com');
        });
        expect(localStorage.getItem('accessToken')).toBe('T8bLmU2e');
    });

    it('Debería cerrar sesión correctamente', () => {
        service.logout();
        expect(localStorage.getItem('accessToken')).toBeNull();
    });


});
