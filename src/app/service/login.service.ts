import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ilogin, IToken } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
   
  constructor(private _http:HttpClient) {

  }

  public login(login: Ilogin):Observable<IToken>{
    return this._http.post<IToken>('http://127.0.0.1:8000/auth/login/',login)
 
  }

  public logout(){
    return this._http.post('http://127.0.0.1:8000/auth/logOut/','')
 
  }


}
