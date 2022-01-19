import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivate {

  constructor(private router: Router){

  }

    isLogin:boolean=false;
    key!:string;
  redirect (flag: boolean):any{
        if(flag==false){
          this.router.navigate(['login'])
        }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.key = String(localStorage.getItem("key"))
          if(this.key!='null'){
            this.isLogin=true;
        }   
    this.redirect(this.isLogin);
    return this.isLogin;
  }
  
}
