import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from "../../infrastructure/services/auth.service";
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { login, loginFailure, loginSuccess, logout, logoutSuccess } from "./auth.action";

@Injectable({ providedIn: 'root' })
export class AuthEffect {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  // Efecto para manejar el login
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ user }) =>
        this.authService.login(user.email, user.password).pipe(
          map(({ token }) => {
            localStorage.setItem('authToken', token);
            return loginSuccess({ user, token });
          }),
          catchError((error) => of(loginFailure({ error: error.message })))
        )
      )
    )
  );

  // Efecto para manejar el logout
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(() => {
        localStorage.removeItem('authToken');
        localStorage.clear();
        return logoutSuccess();
      })
    )
  );
}