import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  constructor(private authSer: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.authSer.getTokenValue();

    if (isAuthenticated) {
      return true; // User is authenticated, allow access to the route
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
