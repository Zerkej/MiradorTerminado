import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = localStorage.getItem('key');
    let request = req;
	//Validamos si el token existe
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '.concat(token)),
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
