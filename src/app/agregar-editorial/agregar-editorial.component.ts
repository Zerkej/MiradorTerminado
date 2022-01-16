import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import Swal from 'sweetalert2';
import {IeditorialAgregar } from '../interfaces/interfaces';
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

  constructor(private _fb: FormBuilder,private commonService: commonService) { }

  createForm() {
    this.editorial = this._fb.group({
      nombreEditorial: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.createForm();
  }
  
  public agregarEditorial(){
    Swal.fire('se ha guardado la editorial','la editorial a sido registrada con exito');
    this.editorialAgregar.nombre=this.nombre;
    if(this.editorialAgregar!=undefined){
      console.log(this.editorialAgregar);
      this.commonService.postEditoriales(this.editorialAgregar).subscribe();
    }
  }
}

