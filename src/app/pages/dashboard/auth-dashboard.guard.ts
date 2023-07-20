import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { authorized } from 'src/app/lib/security';

@Injectable({
  providedIn: 'root'
})
export class AuthDashboardGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
      if(!authorized.check('user')) {
        this.router.navigate(['/auth']);
      }
    return authorized.check('user');
  }
  
}
