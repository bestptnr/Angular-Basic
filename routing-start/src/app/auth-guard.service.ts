import { AuthService } from './auth.service';
import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard {
    constructor(private authService: AuthService,private router : Router) { }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const authenticated = await this.authService.isAuthenticated();
        if (authenticated) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false
        }
    }

    async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.canActivate(route, state);
    }
}

export const isAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
    return inject(AuthGuard).canActivate(route, state)
}
export const isAdminGuardChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
    return inject(AuthGuard).canActivateChild(route, state)
}