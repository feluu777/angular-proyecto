import { Injectable } from "@angular/core";
import { LoginPayLoad } from "../models/models";
import { BehaviorSubject, Observable, map } from "rxjs";
import { users } from "../users";
import { generarStringAleatorio } from "../../shared/utils";
import { Router } from '@angular/router';



const BD_USERS_FAKE: users[] = [{
    id: generarStringAleatorio(6),
    name: "Administrador",
    email: "admin@gmail.com",
    accessToken: "T8bLmU2e",
    rol: 'ADMIN',
    password: "12345",
}, {
    id: generarStringAleatorio(6),
    name: "Usuario",
    email: "user@gmail.com",
    accessToken: "V5g7gWIi",
    rol: 'USUARIO',
    password: "123456"
}];

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authUser$ = new BehaviorSubject<null | users>(null);
    authUser$ = this._authUser$.asObservable();

    constructor(private router: Router) { }

    Logout(): void {
        localStorage.clear()
        this._authUser$.next(null)
        this.router.navigate(['/login'])
    }

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
        localStorage.setItem('accessToken', loginResult.accessToken)
        this._authUser$.next(loginResult);
        this.router.navigate(['/pages/dashboard']);
    }
    isAuthenticated(): Observable<Boolean> {
        const storageUser = BD_USERS_FAKE.find(x => x.accessToken === localStorage.getItem('access_token'))
        this._authUser$.next(storageUser || null)
        return this.authUser$.pipe(map((x) => !!x))
    }
}
