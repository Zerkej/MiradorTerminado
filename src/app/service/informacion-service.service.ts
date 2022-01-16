import { Injectable } from '@angular/core';
import { ImportsNotUsedAsValues } from 'typescript';
import { Iautor, Iuser } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class InformacionServiceService {
  isLogin: boolean=false;
  autorParaBorrar ?:Iautor;
  ultimaId?:number;
  usuarioActual!:Iuser;
  constructor() { }

  public agregarLibroBorrar(autor: Iautor){
         this.autorParaBorrar=autor;
      
  }

  public obtenerAutorParaBorrar():Iautor|undefined{     
        return this.autorParaBorrar;
  }

  public obtenerUltimaEditorialId(ultimaId:number){     
    this.ultimaId=ultimaId;
  }

  public recuperarUltimaEditorialId():number |undefined{     
      return this.ultimaId;
  }

  public cambiarIslogin(){
      this.isLogin = true;
  }

  public recuperarIsLogin(): boolean{
    return this.isLogin;
  }

  public tenerUsuarioActual(): Iuser{
    return this.usuarioActual
  }

  public obtenerUsuarioActual(usuario: Iuser){
    this.usuarioActual=usuario;
  }
}
