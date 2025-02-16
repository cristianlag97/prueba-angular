import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status > 201) {
        snackBar.open(`Error: ${error.message}`, 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      }
      return throwError(() => error);
    })
  );
};
