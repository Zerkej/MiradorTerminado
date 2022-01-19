import { Component, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EventEmitter } from '@angular/core';
import { Ilogin, IToken, Iuser } from '../interfaces/interfaces';
import { InformacionServiceService } from '../service/informacion-service.service';
import { LoginService } from '../service/login.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() logear: EventEmitter<boolean> =new EventEmitter<boolean>();

  token!:IToken
  loginUser!: FormGroup;
  username:String="";
  password:String="";
  userActual!:Iuser;
  existeError:boolean =false

  login: Ilogin = {
    username: "",
    password: ""
  }
  constructor(private _fb: FormBuilder, private router:Router, private loginService:LoginService, private informacionService:InformacionServiceService, private coockieService :CookieService, private navbar:NavbarComponent) { }
  
  createForm() {
    this.loginUser = this._fb.group({
      nombre: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  createFormPassword() {
    this.loginUser = this._fb.group({
      nombre: ["", Validators.email]
    });
  }

  ngOnInit(): void { 
    this.createForm();
  }

  loguear(){
    this.login.username=this.username
    this.login.password=this.password;

    console.log(this.loginService.login(this.login).subscribe(res=>{
      this.userActual=res.user
      this.informacionService.obtenerUsuarioActual(this.userActual);
      this.token=res;
      localStorage.setItem("key",res.access_token)
      localStorage.setItem("pk",this.userActual.pk.toString())
      this.existeError=false;
      this.navbar.isLoginAhora(true)
      this.router.navigate(['inicio'])
    }, err => {
       this.existeError=true;
    }))
  }
  

}
