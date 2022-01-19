import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import Swal from 'sweetalert2';
import { Iautor, IautorAgregar } from '../interfaces/interfaces';
import { commonService } from '../service/common.service';

@Component({
  selector: 'app-agregar-autor',
  templateUrl: './agregar-autor.component.html',
  styleUrls: ['./agregar-autor.component.css']
})
export class AgregarAutorComponent implements OnInit {

  autorAgregar:IautorAgregar={
    nombre:"",
    apellido:""
}
  autor!: FormGroup;
  apellido: String ="";
  nombre: String = "";
  autores:Iautor[];


  constructor(private _fb: FormBuilder , private commonService: commonService ) { }

  createForm() {
    this.autor = this._fb.group({
      nombre: ["", Validators.required],
      apellidos: ["", Validators.required]
    });
  }

  
  ngOnInit(): void {
    this.createForm();
    this.commonService.getAutor().subscribe(data=>{
      this.autores=data;
    })
  }

  public agregarAutor(){
    let existeAutor=false;
    this.autorAgregar.nombre=this.nombre;
    this.autorAgregar.apellido=this.apellido
    for(let i=0; i<this.autores.length;i++){
      if(this.autorAgregar.nombre.toLowerCase()==this.autores[i].nombre.toLowerCase() && this.autorAgregar.apellido.toLowerCase()==this.autores[i].apellido.toLowerCase()){
          existeAutor=true;
          Swal.fire('Operación Fallida','El autor ya existe');
      } 
    }
    if(existeAutor==false){
      if(this.autorAgregar!=undefined){
      this.commonService.postAutor(this.autorAgregar).subscribe(data=>{
        Swal.fire('Se ha guardado el autor','el autor ha sido registrada con exito');
      });
    }
    }
    this.autor.patchValue({
      nombre: '',
      apellidos: ''
    })
  }

}
