import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUser = { email: 'admin@example.com', password: '123456' };

  constructor() { }

  // Autenticación
  login(email: String, password: String): Observable<{ token: string }> {
    if(email === this.mockUser.email && password === this.mockUser.password){
      return of({token: 'moke-token'}).pipe(delay(1000));
    }
    return throwError(() => new Error('Credenciales inválidas')).pipe(delay(1000));
  }
}
