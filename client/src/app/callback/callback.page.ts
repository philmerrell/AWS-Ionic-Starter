import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.page.html',
  styleUrls: ['./callback.page.scss'],
})
export class CallbackPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {}

  async ionViewDidEnter() {
    const code = this.getCodeFromUrl(this.router.url);
    try {
      const response = await this.authService.getTokensFromCognito(code).toPromise();
      await this.authService.saveTokensToLocalStorage(response);
      this.router.navigateByUrl('/', { replaceUrl: true });
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
