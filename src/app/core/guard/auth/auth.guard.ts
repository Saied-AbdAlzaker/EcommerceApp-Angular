import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  let _auth: AuthService = inject(AuthService);
  let _router: Router = inject(Router);

  if (_auth.user() !== null) {
    return true;
  }

  _router.navigate(['/signin'])
  return false;
};
