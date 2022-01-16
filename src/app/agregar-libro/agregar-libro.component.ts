import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ieditorial, Ilibro } from '../interfaces/interfaces';
import { commonService } from '../service/common.service';

@Component({
  selector: 'app-agregar-libro',
  templateUrl: './agregar-libro.component.html',
  styleUrls: ['./agregar-libro.component.css']
})
export class AgregarLibroComponent implements OnInit {
  
  editorialAgregar:Ilibro={
    id_libro : -1,
    nombre: " ",
    precio: -1,
    cantidad: -1,
    descripcion: " ",
    formato: " ",
    editorial: -1,
    imagen:"",
    cantidad_min: 0,
    disponibilidad:0
}
  editoriales!: Ieditorial[];

  libro!: FormGroup;
  nombre: String = "";
  ultimaId!: number ;
  editorial!:String;
  precio!:number;
  descripcion: String= "";
  formato: String =" ";
  imagen:String =" ";
  cantidad!:number;
  cantidad_min!:number;
  dispinibilidad!:number;


  constructor(private _fb: FormBuilder, private commonService: commonService) { }
  
  createForm() {
    this.libro = this._fb.group({
      nombre: ["", Validators.required],
      valor: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      stock: ["", [ Validators.required,Validators.pattern("^[0-9]*$")]],
      entradadescripcion:["", Validators.required],
      formatoLibro:["", Validators.required],
      stock_min: ["", [ Validators.required,Validators.pattern("^[0-9]*$")]],
      });
  }

  ngOnInit(): void {
    this.commonService.getEditoriales().subscribe((data:Ieditorial[]) =>   
    {
        this.editoriales=data;
    }); 

    this.createForm();
  
  }
  agregarLibro(){

  }
}
