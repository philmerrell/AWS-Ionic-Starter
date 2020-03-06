import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  async login() {
    await Browser.open({ url: environment.cognito.loginUrl, windowName: '_SELF' });
  }

  async signUp() {
    await Browser.open({ url: environment.cognito.signUpUrl, windowName: '_SELF' });
  }
}