import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/operators';
import * as auth0 from 'auth0-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: '0gyY78yDUiQcaQ6WFwbAqbe9X5mEs7lc',
    domain: 'dudesup.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'http://localhost:8080',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid view:registration view:registrations'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/admin']);
      } else if (err) {
        this.router.navigate(['/admin']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime() || '');

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.auth0.logout();
    this.router.navigate(['']);
    
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }
}