import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Plugins } from '@capacitor/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

const { Browser, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelperService = new JwtHelperService();
  tokensSubject: BehaviorSubject<any> = new BehaviorSubject({});
  
  constructor(private http: HttpClient) { }

  async login() {
    await Browser.open({ url: `${environment.apiBaseUrl}/v1/auth/login`, windowName: '_SELF' });
  }

  async signUp() {
    await Browser.open({ url: `${environment.apiBaseUrl}/v1/auth/signup`, windowName: '_SELF' });
  }

  async logout() {
    await Storage.remove({ key: `${environment.localStoragePrefix}-TOKENS`});
    await Browser.open({ url: `${environment.apiBaseUrl}/v1/auth/logout`, windowName: '_SELF' });
  }

  getTokensFromCognito(postObj: { code: string; state: string;}) {
    return this.http.post(`${environment.apiBaseUrl}/v1/auth/token`, postObj);
  }

  async saveTokensToLocalStorage(tokens, isRefreshing = false): Promise<any> {
    await Storage.set({ key: `${environment.localStoragePrefix}-TOKENS`, value: JSON.stringify(tokens) });
    this.tokensSubject.next(tokens);
  }

  async getAccessToken() {
    const token = await Storage.get({ key: `${environment.localStoragePrefix}-TOKENS`});
    return JSON.parse(token.value);
  }

  async isAuthenticated() {
    const token = await this.getAccessToken();
    if (token) {
      const isExpired = this.jwtHelperService.isTokenExpired(token.access_token);
      return !isExpired;
    } else {
      return false;
    }
  }

  async decodeAccessToken(token) {
    return await this.jwtHelperService.decodeToken(token.id_token);
  }

  

}
