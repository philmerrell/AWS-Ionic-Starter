import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isAuthenticated = false;
  user;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.isAuthenticated = await this.authService.isAuthenticated();
    this.getUser();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  signUp() {
    this.authService.signUp();
  }

  async getUser() {
    const token = await this.authService.getAccessToken();
    // console.log(token);
    this.user = await this.authService.decodeAccessToken(token);
  }



}
