import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login() {
    // TODO: replace with capacitor Browser
    window.open(environment.cognito.loginUrl, '_SELF');
  }

  signUp() {
    window.open(environment.cognito.signUpUrl, '_SELF');
  }
}
