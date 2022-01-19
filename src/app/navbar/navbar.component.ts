import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { InformacionServiceService } from '../service/informacion-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class NavbarComponent implements OnInit {
  isLogin:boolean=false;
  key!:string;
  constructor( private informacionService:InformacionServiceService) { }
  ngOnInit(): void {
    this.key = String(localStorage.getItem("key"))
          if(this.key!='null'){
            this.isLogin=true;

        } 
  }
  isLoginAhora(isLogin: boolean){
      this.isLogin=isLogin
  }
}


