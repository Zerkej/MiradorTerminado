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
  autor:Iautor={
    nombre:"",
    apellido:"",
    id_autor:-1
  }
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
  //Se guarda el nombre + el apellido del autor en minuscula 
  autorNombreMinuscula:string="";
  //se guarda el filtro en minusculas
  filtroMinusculas:string='';
  //copia autores
  copiaAutores:Iautor[]
  //sirve como variable para guardar el dia actual
  LocalDate: Date = new Date();

  ngOnInit(): void {
    this.createForm()
    this.createFormApellido()
    //Se cargan todos los autores
    this.commonService.getAutor().subscribe((data:Iautor[]) =>   
      {
        this.autores=data.reverse();
        this.copiaAutores=data.reverse();
      }); 
  }
    
  //Se obtiene el autor que se desea borrar
  obtenerAutorEditar(autor: Iautor){
      this.editar=true;
      this.autor.nombre=autor.nombre
      this.autor.id_autor=autor.id_autor
      this.autor.apellido=autor.apellido
  }
  //sirve para volver al codigo html de autores
  volverAutores(){
    this.autoresNombre.patchValue({
      entradaNombres:''
    })
    this.autoresApellidos.patchValue({
      entradaApellidos:''
    })   
      this.ngOnInit()
      this.editar=false;
  }
  //Sirve para borrar un autor
  editarNombreAutor(){
        let existe =false
        this.autor.nombre=this.nombresCambiar
        for(let i=0; i<this.autores.length;i++){
          if(this.autores[i].nombre.toLowerCase()==this.autor.nombre.toLowerCase()
          && this.autores[i].apellido.toLowerCase()==this.autor.apellido.toLowerCase()){
            console.log("aca estoy")
            existe=true;
            Swal.fire('No se ha podido editar','El nombre formado coincide con otro Autor');
          }
        }
        if(existe==false){
           this.commonService.putAutor(this.autor).subscribe(data=>{
           Swal.fire('Se ha editadon los nombres del autor de forma correcta','la operación fue un exito');
           existe=false
           });
        }
        this.autoresNombre.patchValue({
          entradaNombres:''
        })
        this.autoresApellidos.patchValue({
          entradaApellidos:''
        })   

  }

  editarApellidoAutor(){
       let existe =false
        this.autor.apellido=this.apellidosCambiar
        for(let i=0; i<this.autores.length;i++){
          if(this.autores[i].nombre.toLowerCase()==this.autor.nombre.toLowerCase()
          && this.autores[i].apellido.toLowerCase()==this.autor.apellido.toLowerCase()){
            existe=true;
            Swal.fire('No se ha podido editar','el nombre formado coincide con otro Autor');
          }
        }
        if(existe==false){
           this.commonService.putAutor(this.autor).subscribe(data=>{
           Swal.fire('se han editado los apellidos del autor de forma correcta','la operación fue un exito');
           existe=false
           });
        }
        
  }
  //sirve para foltrar los autores
  filtrarAutores(){
          this.autores=this.copiaAutores
          if(this.filtro!=""){
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
  }
  //sirve para restablecer todos los autores
  restablecerAutores(){
    this.autores=this.copiaAutores
  }

  }


