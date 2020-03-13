
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenRequestInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
    });
    return next.handle(req);
    // if (req.url.includes(`${environment.apiBaseUrl}/v1/auth/token`)) {
    //   req = req.clone({
    //     withCredentials: true
    //   });
    //   return next.handle(req);
    // } else {
    //   return next.handle(req);
    // }
  }
}