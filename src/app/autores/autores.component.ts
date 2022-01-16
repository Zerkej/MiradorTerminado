import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Iautor } from '../interfaces/interfaces';
import { commonService} from '../service/common.service';
import {InformacionServiceService } from '../service/informacion-service.service'

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {
  nombresCambiar:String="";
  apellidosCambiar:String="";
  autoresNombre!:FormGroup;
  autoresApellidos!:FormGroup;

  constructor(private commonService: commonService, private informacionService: InformacionServiceService,private _fb: FormBuilder) { }

  createForm(): void {
    this.autoresNombre = this._fb.group({
      entradaNombres: ["", Validators.required]
    });
  }

  createFormApellido(): void {
    this.autoresApellidos = this._fb.group({
      entradaApellidos: ["", Validators.required]
    });
  }

  //se trae a todos los autores
  autores!:Iautor[];
  //Se guarda el autor que se desea borrar
  autorBorrar!:Iautor;
  //es para ir al html de editar
  editar:boolean=false;
  //se guarda un autor en especifico
  autor!:Iautor
  //Se guarda el nombre de un autor para borrarlo
  nombreAutor?:String ="";
  //Se guarda el apellido de un autor para borrarlo
  apellidoAutor?:String ="";
  //Se guarda la id de un autor
  idAutor!:number;
  //se guarda el filtro en esta variable
  filtro:string= '';
  //se guardan los autores filtrado
  autoresFiltrados:Iautor[]=[];
  //Se guarda una copia de los autores para restablecer
  copiaAutores:Iautor[]=[];
  //Se guarda el nombre + el apellido del autor en minuscula 
  autorNombreMinuscula:string="";
  //se guarda el filtro en minusculas
  filtroMinusculas:string='';
  //token
  token:string|null=localStorage.getItem("key")

  ngOnInit(): void {
    this.createForm()
    this.createFormApellido()
    //Se cargan todos los autores
    this.commonService.getAutor().subscribe((data:Iautor[]) =>   
      {
        this.autores=data.reverse();
      }); 

      this.copiaAutores=this.autores;

  }
    
  //Se obtiene el autor que se desea borrar
  obtenerAutorEditar(autor: Iautor){
      this.editar=true;
      this.autor=autor
  }
  //sirve para volver al codigo html de autores
  volverAutores(){
      this.ngOnInit()
      this.editar=false;
  }
  //Sirve para borrar un autor
  editarNombreAutor(){
        console.log("aca toy")
        this.autor.nombre=this.nombresCambiar
        console.log(this.autor)
        this.commonService.putAutor(this.autor).subscribe(data=>{
          Swal.fire('se ha editado los nombres del autor de forma correcta','la operación fue un exito');
        });
  }

  editarApellidoAutor(){
        this.autor.apellido=this.apellidosCambiar
        console.log(this.autor)
        this.commonService.putAutor(this.autor).subscribe(data=>{
          Swal.fire('se ha editado elos apellidos del autor de forma correcta','la operación fue un exito');
        });
  }
  //sirve para foltrar los autores
  filtrarAutores(){
          for (let i=0; i<this.autores?.length; i++){
            this.filtroMinusculas=this.filtro.toLowerCase();
            this.autorNombreMinuscula=this.autores[i].nombre.toLowerCase()+this.autores[i].apellido.toLowerCase();

                    if(this.autorNombreMinuscula.includes(this.filtroMinusculas)){
                        this.autoresFiltrados.push(this.autores[i])
                    }   
                }
                console.log(this.autoresFiltrados);
                this.autores=this.autoresFiltrados; 
                this.autoresFiltrados=[]
  }
  //sirve para restablecer todos los autores
  restablecerAutores(){
    this.commonService.getAutor().subscribe((data:Iautor[]) =>   
    {
      this.autores=data;
    }); 
  }

  }


