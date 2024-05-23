import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../service/auth/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService);
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.getUser();

  let token = cookieService.get('Authorization');
  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token);

    const expirationDate = decodedToken.exp * 1000;
    const cuurentTime = new Date().getTime();

    if (expirationDate < cuurentTime) {
      auth.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnurl: state.url } });
    }
    else {

      const allowedRoles = route.data['allowedRoles'] as Array<string>;
      if (allowedRoles.includes(user.role)) {
        return true; 
      }
      else {
        alert('unauthorized');
        return router.createUrlTree(['/login'], { queryParams: { returnurl: state.url } });
      }
    }
  }
  else {

    auth.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnurl: state.url } });
  }

};
