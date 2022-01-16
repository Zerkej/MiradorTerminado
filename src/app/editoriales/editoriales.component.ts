import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Ieditorial} from '../interfaces/interfaces';
import { commonService } from '../service/common.service';
import { InformacionServiceService } from '../service/informacion-service.service';

@Component({
  selector: 'app-editoriales',
  templateUrl: './editoriales.component.html',
  styleUrls: ['./editoriales.component.css']
})
export class EditorialesComponent implements OnInit {

  constructor(private commonService: commonService, private informacionService:InformacionServiceService,private _fb: FormBuilder) { }
  //se almacena la cantidad editada
  cantdidadEditada!: number;
  //sirve para ir al html de borrar
  editar:boolean=false;
  //sirve para traerl a todas las editoriales
  editoriales!:Ieditorial[];
  //sirve para especificar el nombre de la editorial que se desea elimianr
  nombre:String="";
  //sirve para especificar el id de la editorial que se desea eliminar
  id_editorial!:number;
  //Sirve para hacer que todo el filtro este en minuscula
  filtroMinusculas:string="";
  //Sirve para hacer que todo el nombre la editorial este en minuscula
  autorNombreMinuscula:string="";
  //el filtro ocupado
  filtro:string="";
  //todos los autores filtrados
  autoresFiltrados:Ieditorial[]=[]
  //Se guarda el formulario
  editorialNombre!:FormGroup;
  //se guarda la variable nuevo nombre
  nuevoNombre:String="";
  //se guarda la editorial para editar
  editorialEditar!:Ieditorial;

  createForm(): void {
    this.editorialNombre = this._fb.group({
      entradaNombre: ["", Validators.required]
    });
  }

  ngOnInit(): void {
      this.createForm()
        //se trae a todos las editoriales
      this.commonService.getEditoriales().subscribe((data:Ieditorial[]) =>   
      {
        this.editoriales=data.reverse();
      }); 

  }

  //se usar para traer la editorial que se desea borrar
  obtenerEditorialEditar(editorial: Ieditorial){
    this.editar=true;
    this.editorialEditar=editorial
  }
  //para volver al html de editoriales
  volverEditoriales(){
      this.ngOnInit()
      this.editar=false;
  }
  //con esta se borra una editorial y se da la alerta correspondiente
  editarEditorial(){
    this.editorialEditar.nombre=this.nuevoNombre
    this.commonService.putEditorial(this.editorialEditar).subscribe(data=>{
      Swal.fire('se ha editado el nombre de la editorial de forma correcta','la operación fue un exito');
    })

  }
  //sirve para filtrar las editoriales
  filtrarEditoriales(){
    for (let i=0; i<this.editoriales?.length; i++){
      this.filtroMinusculas=this.filtro.toLowerCase();
      this.autorNombreMinuscula=this.editoriales[i].nombre.toLowerCase();

              if(this.autorNombreMinuscula.includes(this.filtroMinusculas)){
                  this.autoresFiltrados.push(this.editoriales[i])
              }   
          }
          console.log(this.autoresFiltrados);
          this.editoriales=this.autoresFiltrados; 
          this.autoresFiltrados=[]
}
  //sirve para volver a mostrar todas las editoriales
  restablecerEditoriales(){
      this.commonService.getEditoriales().subscribe((data:Ieditorial[]) =>   
      {
      this.editoriales=data;
      }); 
  }
  
}

