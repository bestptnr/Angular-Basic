import { inject, Injectable } from "@angular/core"
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router"
import { Observable } from "rxjs"
import { AuthService } from "./auth.service"
import { map, take, tap } from "rxjs/operators"


@Injectable({
    providedIn : 'root'
})
export class AuthGuard {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.user.pipe(take(1),map(user => {
            const isAuth = !!user
            if (isAuth) {
                return true
            }
            return this.router.createUrlTree(['/auth'])
        }))
    }

}

export const isAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    return inject(AuthGuard).canActivate(route, state)
}