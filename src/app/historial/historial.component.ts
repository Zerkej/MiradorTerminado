import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Ilibro, IlibroCambiarStock, Isalida, ISalidaGet } from '../interfaces/interfaces';
import { commonService } from '../service/common.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  //sirve para cambiar el html visto en pantalla
  verMasVentana:Boolean=false;
  //Se guardan todas las salidas
  salidas!:ISalidaGet[] ;
  //Se guardan todas las salidas en una copia
  salidasCopia!:ISalidaGet[] ;
  //se guardaran las salidas filtradas
  salidasFiltradas!:ISalidaGet[];
  //se gurada una salida que se desea verMas
  salidaVerMas!:ISalidaGet;
  //se guarda el filtro
  filtro:string;

  constructor(private commonService: commonService) { }

  ngOnInit(): void {
    //Se trae todo el historial
    this.commonService.getSalidasCompleta().subscribe((data:ISalidaGet[]) =>   
      {
        this.salidas=data.reverse();
        this.salidasCopia=data.reverse();
      }); 
      
  }

  irAVerMasSalida(salida : ISalidaGet){
    this.verMasVentana=true;
    this.salidaVerMas=salida
    console.log(salida)
    console.log(this.salidas)
  }

  volverASalidas(){
    this.verMasVentana=false
  }

  filtrar(){
    let filtroMinusculas:string
    let salidaTipoMinuscula:string
    this.salidas=this.salidasCopia
    if(this.filtro!=""){
      for (let i=0; i<this.salidas.length; i++){
            filtroMinusculas=this.filtro.toLowerCase();
            salidaTipoMinuscula=this.salidas[i].tipo.toLowerCase();
                if(salidaTipoMinuscula.includes(filtroMinusculas)){
                      console.log(this.salidas[i])
                      this.salidasFiltradas.push(this.salidas[i])
                }   
            }
                this.salidas=this.salidasFiltradas; 
                this.salidasFiltradas=[]
  }
  
  }
  restablecerSalidas(){
    this.salidas=this.salidasCopia
  }
}
