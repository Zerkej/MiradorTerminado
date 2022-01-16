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

  //se gurada una salida que se desea verMas
  salidaVerMas!:ISalidaGet;
  filtro!:Date;

  constructor(private commonService: commonService) { }

  ngOnInit(): void {
    //Se trae todo el historial
    this.commonService.getSalidasCompleta().subscribe((data:ISalidaGet[]) =>   
      {
        this.salidas=data.reverse();
        console.log(this.salidas);
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
}
