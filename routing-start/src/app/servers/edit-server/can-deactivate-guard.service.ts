import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivateFn } from '@angular/router';
import { inject, Injectable } from '@angular/core';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard {
    canDeactivate(component: CanComponentDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate();

    }
}

// export function canDeactivateGuard(component: CanComponentDeactivate,
//     currentRoute: ActivatedRouteSnapshot,
//     currentState: RouterStateSnapshot,
//     nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     return inject(CanDeactivateGuard).canDeactivate(component, currentRoute, currentState, nextState);
// }
