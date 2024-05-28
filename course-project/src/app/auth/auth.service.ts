import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer : any
    constructor(private http: HttpClient,private router : Router) { }

    signUp(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBt16AoRXcPVPlBL93mwDW6zA6WqNkFNs4',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            )
            .pipe(
                catchError(this.handleError),
                tap((resData) => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }
    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKEY,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            )
            .pipe(
                catchError(this.handleError),
                tap((resData) => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }

    logout() {
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('user')
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null
    }
    autoLogout(expriationDuration : number){
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout()
        },expriationDuration)
    }
    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('user'))
        if (!userData) {
            return
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
        if (loadedUser.getToken()) {
            this.user.next(loadedUser)
            console.log(userData)
            const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
            console.log(expirationDuration)
            this.autoLogout(expirationDuration);


        }
    }
    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ) {
        const expireationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, userId, token, expireationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('user', JSON.stringify(user))
    }
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        console.log(errorRes.error.error)
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage =
                    'There is no user record corresponding to this identifier. ';
                break;
            case "INVALID_LOGIN_CREDENTIALS":
                errorMessage =
                    'The password is invalid or the user does not have a password.';
                break;
        }
        return throwError(errorMessage);
    }
}
