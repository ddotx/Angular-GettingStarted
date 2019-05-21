import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

constructor(
  private authService: AuthService,
  private router: Router
){}

  canActivate(

    //* ActivatedRouteSnapshot ==> Provide information about the current, about to be activated route at a particular moment in time ==> to get information on the current route (route parameters, route data)

    //* RouterStateSnapshot ==> provide access to the entire router state
    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path)
  }

  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }

    // Retain the attempted URL for redirection
    this.authService.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }


  
}
