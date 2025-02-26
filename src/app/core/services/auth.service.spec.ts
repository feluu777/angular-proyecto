import { AuthService } from './auth.services';
import { Router } from '@angular/router';

describe('AuthService', () => {
    let service: AuthService;
    let router: Router;

    beforeEach(() => {
        router = { navigate: () => { } } as unknown as Router;

        service = new AuthService(router);
    });

    it('Deberia loguearse correctamente', () => {
        const payload = { Email: 'admin@gmail.com', Contraseña: '12345' };
        service.login(payload);
        service.authUser$.subscribe(user => {
            expect(user?.email).toBe('admin@gmail.com');
        });
        expect(localStorage.getItem('accessToken')).toBe('T8bLmU2e');
    });


    it('Deberia cerrar sesión correctamente', () => {
        service.Logout();

        expect(localStorage.getItem('accessToken')).toBeNull();

    });

    it('Debería devolver falso si no está autenticado', () => {
        localStorage.removeItem('accessToken');

        service.isAuthenticated().subscribe(isAuthenticated => {
            expect(isAuthenticated).toBeFalse();
        });
    });
});
