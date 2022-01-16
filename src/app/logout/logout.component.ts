import { Component, OnInit } from '@angular/core';
import { Iuser, Iuser_vendedor, Ivendedor } from '../interfaces/interfaces';
import { NavbarComponent } from '../navbar/navbar.component';
import { commonService } from '../service/common.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private commonService:commonService , private loginService: LoginService, private navbar: NavbarComponent) { }
      usuarioActual!:Ivendedor;
  ngOnInit(): void {
    //Se obtiene el vendedor actual
    this.commonService.getUser_vendedor(Number(localStorage.getItem("pk"))).subscribe((data:Iuser_vendedor)=>{
      console.log(data)
      this.usuarioActual=data.vendedor
      console.log(this.usuarioActual)
    })
  }

  logOut(){
    localStorage.clear();
    this.navbar.isLoginAhora(false)
    this.loginService.logout();
    
  }

}
