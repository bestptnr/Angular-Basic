import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponents  implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, { static: true }) alertHost: PlaceholderDirective
    private closeSub : Subscription

    constructor(
        private authSerive: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onHandleError() {
        this.error = null;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponseData>;
        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authSerive.login(email, password);
        } else {
            authObs = this.authSerive.signUp(email, password);
        }
        authObs.subscribe(
            (response) => {
                console.log(response);
                this.isLoading = false;
                this.router.navigate(['./recipes']);
            },
            (errorMsg) => {
                this.error = errorMsg;
                this.isLoading = false;
                this.showErrorAlert(errorMsg);
            }
        );
        form.reset();
    }

    private showErrorAlert(message: string) {
        const alertCmp = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
        const hostViewContainer = this.alertHost.viewContainerRef
        hostViewContainer.clear()
        const componentRef =   hostViewContainer.createComponent(alertCmp)
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(()=>{
            this.closeSub.unsubscribe()
            hostViewContainer.clear()
        })
    }

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe()
        }
    }

}

