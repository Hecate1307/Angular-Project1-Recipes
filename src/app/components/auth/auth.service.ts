import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
    private router: Router) { }
  // API_KEY = 'AIzaSyD5XKdq9WTcKNeFoJhTrKcSvT2a3ck9dWk';



  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`
      , {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(
        res => {
          this.handleAuth(res.email, res.localId, res.idToken, +res.expiresIn);
        })
    );
  }

  autoLogin() {
    const user: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!user) {
      return;
    }
    const newUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));

    if (newUser.token) {
      this.user.next(newUser);
      const expiresIn = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expiresIn);
    }

  }


  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        catchError(this.handleError),
        tap(
          res => {
            this.handleAuth(res.email, res.localId, res.idToken, +res.expiresIn);
          })
      );
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    alert("Do you want to log out?");
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleAuth(email: string, id: string, token: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    // new Date().getTime() return ms but res.expiresIn return second
    const user = new User(email, id, token, expDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "Unknown error occur!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_NOT_FOUND":
        errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is invalid or the user does not have a password.";
        break;
      case 'EMAIL_EXISTS':
        errorMessage = "The email address is already in use by another account.";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMessage = "Password sign-in is disabled for this project.";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
        break;
      case "USER_DISABLED":
        errorMessage = "The user account has been disabled by an administrator.";
        break;
    }
    return throwError(errorMessage);
  }
}
