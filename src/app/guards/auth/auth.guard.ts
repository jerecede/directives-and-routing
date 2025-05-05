import { CanActivateFn, createUrlTreeFromSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authServ = inject(AuthService);
  const router = inject(Router)
  if(authServ.isAuth){
    return true;
  } else {
    return router.createUrlTree(['/login']); //invece di non caricarti la pagina ti rimanda al login
    // return false
  }
  // return authServ.isAuth;
};
