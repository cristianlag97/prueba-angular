import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectToken } from '../../presentation/store/auth.selector';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectToken).pipe(
    take(1),
    map(token => {
      if (token) {
        return true;
      } else {
        router.navigate(['/auth/sign-in']);
        return false;
      }
    })
  );
};
