import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Iautor, Ieditorial, IstockPost} from '../interfaces/interfaces';
import { commonService } from '../service/common.service';



@Component({
  selector: 'app-agregar-libro',
  templateUrl: './agregar-libro.component.html',
  styleUrls: ['./agregar-libro.component.css']
})
export class AgregarLibroComponent implements OnInit {
  
  //se guardan los componentes que seran utilizados para el ngModel del formulario
  editoriales!: Ieditorial[];
  libro!: FormGroup;
  nombre: string = "";
  editorial!:string;
  precio!:number;
  descripcion: string= "";
  formato: string =" ";
  cantidad!:number;
  cantidad_min!:number;
  //se trae a todos los autores
  autores!:Iautor[];
  //se guarda el filtro autores en esta variable
  filtro:string= '';
  //se guarda el filtro editorial en esta variable
  filtroEditorial:string= '';
  //se guardan los autores filtrado
  autoresFiltrados:Iautor[]=[];
  //Se guarda el nombre + el apellido del autor en minuscula 
  autorNombreMinuscula:string="";
  //se guarda el filtro en minusculas
  filtroMinusculas:string='';
  //se guardan los autores filtrado
  editorialesFiltradas:Ieditorial[]=[];
  //Se guarda el nombre + el apellido del autor en minuscula 
  editorialNombreMinuscula:string="";
  //se guarda el filtro en minusculas
  filtroMinusculasEditorial:string='';
  //autoresActuales
  autoresActuales:Iautor[]=[]
  //editorialActual
  editorialActual!:Ieditorial;
  //autoresActuales
  autoresId:number[]=[]
  //editorialActual
  editorialId:number=-1;
  //existeAutor
  existeAutor:boolean=false;
  //existeEditorial
  existeEditorial:boolean=false;
  //existeEditorial
  existeImagen:boolean=false;
  //se inicializa el libro
  imagenUpdate!:any;
  //Existe autor
  existeAutorAgregar:Boolean = false;
  //imagen para previsualizar
  imagenPrevisualizacion:String;
  //copia de Editoriales
  editorialesCopia:Ieditorial[]
  //copia de autores
  autorCopia:Iautor[]
  //se crea el libro que se usara para ser creado
  libroAgregar:IstockPost={
    autor: [],
    nombre: "",
    precio: 0,
    cantidad: 0,
    descripcion: "",
    formato: "",
    editorial: -1,
    imagen: "",
    cantidad_min: -1,
    disponibilidad: 0,

  };
  //activar boton agregar libro
  agregarLibroOpcion:boolean=true;

  constructor(private _fb: FormBuilder, private commonService: commonService, private sanitizer: DomSanitizer) { 
  }
  
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

    //Se llama a los libros
    this.commonService.getAutor().subscribe((data:Iautor[]) =>   
      {
        this.autores=data.reverse();
        this.autorCopia=data.reverse();
      }); 

    //se llama a las editoriales
    this.commonService.getEditoriales().subscribe((data:Ieditorial[]) =>   
    {
        this.editoriales=data.reverse();
        this.editorialesCopia=data.reverse();
    }); 

    this.createForm();
  }
 
  filtrarAutores(){
    this.autores=this.autorCopia;
    console.log(this.autores)
    if(this.filtro!=""){
      for (let i=0; i<this.autores?.length; i++){
      this.filtroMinusculas=this.filtro.toLowerCase();
      this.autorNombreMinuscula=this.autores[i].nombre.toLowerCase()+this.autores[i].apellido.toLowerCase();
              if(this.autorNombreMinuscula.includes(this.filtroMinusculas)){
                  this.autoresFiltrados.push(this.autores[i])
              }   
          }
          this.autores=this.autoresFiltrados;
          this.autoresFiltrados=[]
    }
    
   }

    filtrarEditoriales(){
    this.editoriales=this.editorialesCopia
    if(this.filtroEditorial!=""){
        for (let i=0; i<this.editoriales?.length; i++){
              this.filtroMinusculasEditorial=this.filtroEditorial.toLowerCase();
              this.editorialNombreMinuscula=this.editoriales[i].nombre.toLowerCase();

                      if(this.editorialNombreMinuscula.includes(this.filtroMinusculasEditorial)){
                          this.editorialesFiltradas.push(this.editoriales[i])
                      }   
                  }
                  this.editoriales=this.editorialesFiltradas; 
                  this.editorialesFiltradas=[]
    }
   }

    restablecerAutores(){
      this.autores=this.autorCopia
    }
    restablecerEditoriales(){
      this.editoriales=this.editorialesCopia
    }
    limpiarAutores(){
      this.autoresId=[];
      this.autoresActuales=[];
      this.existeAutor=false;
    }

    limpiarEditorial(){
      this.editorialId=-1
      this.editorialActual=null;
      this.existeEditorial=false;
    }


    cargarImagen(event: any){
      let archivo =event.target.files[0]
      this.extraerBase64(archivo).then((imagen:any) => {
        this.imagenPrevisualizacion=imagen.base;
        console.log(imagen)
      })
      this.imagenUpdate=archivo;
      this.existeImagen=true;
      this.ngOnInit;
      
    }

    extraerBase64 = async ($event:any) => new Promise((resolve, reject)=>{
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustHtml(unsafeImg);
        const reader= new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () =>{
          resolve({
            base: reader.result
          });
        };
        reader.onerror = error =>{
          resolve({
            base: null
          });
          
        };
    }catch(e){
      return null;
    }
  })

  agregarAutor(autor:Iautor){
    for(let i=0; i < this.autoresActuales.length; i++){
      if(this.autoresActuales[i].id_autor==autor.id_autor){
        Swal.fire('El autor ya existe fue agregado');
        this.existeAutorAgregar=true  
      }else{
        this.existeAutorAgregar=false  
      }
    }
    if(this.existeAutorAgregar==false){
       this.autoresActuales.push(autor);
        this.autoresId.push(autor.id_autor);
        this.existeAutor=true; 
    }   
    
}

 agregarEditorial(editorial:Ieditorial){
   this.editorialId=editorial.id_editorial;
   this.editorialActual=editorial;
   this.existeEditorial=true;
 }
  
 agregarLibro(){
  const formuluarioImagen = new FormData();
  formuluarioImagen.append('imagen', this.imagenUpdate, this.imagenUpdate.name)
  formuluarioImagen.append('nombre', this.nombre)
  formuluarioImagen.append('cantidad',this.cantidad.toString())
  formuluarioImagen.append('cantidad_min', this.cantidad_min.toString())
  formuluarioImagen.append('descripcion',this.descripcion)
  formuluarioImagen.append('disponibilidad',"1")
  formuluarioImagen.append('editorial',this.editorialId.toString())
  formuluarioImagen.append('formato', this.formato)
  formuluarioImagen.append('precio', this.precio.toString())
  
  for(let i=0; i<this.autoresId.length;i++){
    formuluarioImagen.append('autor', this.autoresId[i].toString())
  }

  console.log(formuluarioImagen)
  this.commonService.postStock(formuluarioImagen).subscribe(data=>{
    Swal.fire('El libro ha sido agregado correctamente','la operación fue un exito');
  })

  this.libro.patchValue({
      nombre:'', 
      valor: '',
      stock: '',
      entradadescripcion: '',
      formatoLibro:'',
      stock_min: ''
  })
  this.limpiarAutores()
  this.limpiarEditorial()
}
validar(){
  if(this.existeAutor==true &&this.existeEditorial==true && this.existeImagen==true && this.libro.invalid==false){
       this.agregarLibroOpcion=false;
  }
}

}
