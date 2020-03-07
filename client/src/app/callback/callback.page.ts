import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.page.html',
  styleUrls: ['./callback.page.scss'],
})
export class CallbackPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient) { }

  ngOnInit() {}

  async ionViewDidEnter() {
    const code = this.getCodeFromUrl(this.router.url);
    try {
      const response = await this.authService.getTokens(code).toPromise();
      console.log(response);
      // await this.authService.saveTokensToLocalStorage(response);
      // this.router.navigateByUrl('/', { replaceUrl: true });
    } catch (error) {
      console.log(error);
      alert('Uh oh.');
    }
  }

  private getCodeFromUrl(url: string) {
    const splitUrl = url.split('?code=');
    return splitUrl[1];
  }

}
