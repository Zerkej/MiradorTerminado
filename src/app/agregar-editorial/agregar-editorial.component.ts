import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import Swal from 'sweetalert2';
import {Ieditorial, IeditorialAgregar } from '../interfaces/interfaces';
import { commonService } from '../service/common.service';

@Component({
  selector: 'app-agregar-editorial',
  templateUrl: './agregar-editorial.component.html',
  styleUrls: ['./agregar-editorial.component.css']
})
export class AgregarEditorialComponent implements OnInit {
  editorialAgregar:IeditorialAgregar={
      nombre:""
  }
    
  editorial!: FormGroup;
  nombre: String = "";
  editoriales!:Ieditorial[]

  constructor(private _fb: FormBuilder,private commonService: commonService) { }

  createForm() {
    this.editorial = this._fb.group({
      nombreEditorial: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.createForm();

    this.commonService.getEditoriales().subscribe(data=>{
        this.editoriales=data
    })
  }
  
  public agregarEditorial(){
    let existe=false;
    this.editorialAgregar.nombre=this.nombre;
    for(let i=0; i<this.editoriales.length; i++){
      if(this.editoriales[i].nombre.toUpperCase()==this.nombre.toUpperCase()){
        Swal.fire('La operación no se ha realizado','La editorial ya existe');
        existe=true;
      }
    }
    if(existe==false){
      if(this.editorialAgregar!=undefined){
          this.commonService.postEditoriales(this.editorialAgregar).subscribe(data=>{
            Swal.fire('Se ha guardado la editorial','La editorial a sido registrada con exito');
          });
          this.editorial.patchValue({
            nombreEditorial:''
          })
      }
    }
 }
}
