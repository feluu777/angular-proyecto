import { Injectable } from "@angular/core";
import { LoginPayLoad } from "../models/models";
import { BehaviorSubject, Observable, map } from "rxjs";
import { users } from "../users";
import { generarStringAleatorio } from "../../shared/utils";
import { Router } from '@angular/router';
import { Store } from "@ngrx/store";
import { AuthActions } from "../../store/auth/auth.action";

const BD_USERS_FAKE: users[] = [
    {
        id: generarStringAleatorio(6),
        name: "Administrador",
        email: "admin@gmail.com",
        accessToken: "T8bLmU2e",
        rol: 'ADMIN',
        password: "12345",
    },
    {
        id: generarStringAleatorio(6),
        name: "Usuario",
        email: "user@gmail.com",
        accessToken: "V5g7gWIi",
        rol: 'USUARIO',
        password: "123456"
    }
];

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authUser$ = new BehaviorSubject<null | users>(null);
    authUser$ = this._authUser$.asObservable();

    constructor(private router: Router, private store: Store) { }
    login(payload: LoginPayLoad): void {
        const loginResult = BD_USERS_FAKE.find(
            (user) =>
                user.email === payload.Email &&
                user.password === payload.Contraseña
        );

        if (!loginResult) {
            alert("Las credenciales son incorrectas.");
            return;
        }

        localStorage.setItem('accessToken', loginResult.accessToken);
        localStorage.setItem('userRole', loginResult.rol); // Guardar el rol en localStorage

        this.store.dispatch(AuthActions.setAuthUser({ user: loginResult }));
        this._authUser$.next(loginResult);
        this.router.navigate(['/pages/dashboard']);
    }

    logout(): void {
        localStorage.clear();
        this._authUser$.next(null);
        this.router.navigate(['/login']);
    }

    /**
     * Verifica si el usuario está autenticado.
     */
    isAuthenticated(): Observable<boolean> {
        const storageUser = BD_USERS_FAKE.find(x => x.accessToken === localStorage.getItem('accessToken'));
        this._authUser$.next(storageUser || null);
        return this.authUser$.pipe(map((user) => !!user));
    }

    /**
     * Obtiene el rol del usuario autenticado.
     */
    getUserRole(): string | null {
        const user = this._authUser$.value;
        return user ? user.rol : localStorage.getItem('userRole');
    }

    /**
     * Verifica si el usuario es administrador.
     */
    isAdmin(): boolean {
        return this.getUserRole() === 'ADMIN';
    }
}
