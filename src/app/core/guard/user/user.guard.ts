import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  let _auth: AuthService = inject(AuthService);
  let _router: Router = inject(Router);

  if (_auth.user() == null) {
    return true;
  }

  _router.navigate(['/home'])
  return false;
}
