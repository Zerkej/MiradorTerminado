import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icredencial  } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public logueado: boolean = false;
   
  constructor(private http:HttpClient) {
    
  }
}
