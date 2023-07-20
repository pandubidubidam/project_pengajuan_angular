import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthLogin(): string | null {
    return localStorage.getItem('auth-login');
  }

  isLoggedIn() {
    let authLogin = JSON.parse(this.getAuthLogin() || '{}');
    if(
      Object.keys(authLogin).length != 0 &&
      authLogin.token != '' &&
      authLogin.branch != '' &&
      authLogin.nik != '' &&
      authLogin.skeleton != ''
      ) {
      return true;
    }else {
      return false;
    }
  }
}
