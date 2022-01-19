
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {Iautor, Ieditorial,IlibroCambiarStock, ISalidaAgregar, Istock, Iuser_vendedor, Ivendedor} from '../interfaces/interfaces';
import { commonService } from '../service/common.service';
import { DatePipe } from '@angular/common'
import { InformacionServiceService } from '../service/informacion-service.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  

  constructor(private _fb: FormBuilder,private commonService: commonService,public datepipe: DatePipe, private informacionService:InformacionServiceService, private sanitizer: DomSanitizer) {

   }
    //libro a editar
    libroEditar!:Istock;
    //se almacena los valores para editar
    nombre: string = "";
    editorial!:string;
    precio!:number;
    descripcion: string= "";
    formato: string =" ";
    cantidad_min!:number;
   //esto es para mostrar que nos vamos al html correspondiente a bajo stock
   bajoStock:boolean=false;
   //sirve para ir a cambiar stock
   cambiarStock:boolean=false;
   //sirve para cambiar a Editar
   ventanaEditar:boolean=false;
   //Esto sirve para inicializar el formulario reactivo que se utilizara para cambiar el stocl
   stockCambiar!: FormGroup;
   //Esto sirve para inicializar el formulario reactivo que se utilizara para cambiar el nombre
   cambiarNombre!: FormGroup;
   //Esto sirve para inicializar el formulario reactivo que se utilizara para cambiar el precio
   cambiarPrecio!: FormGroup;
   //Esto sirve para inicializar el formulario reactivo que se utilizara para cambiar el cantidad Minima
   cambiarCantidadMinima!: FormGroup;
   //Esto sirve para inicializar el formulario reactivo que se utilizara para cambiar el Descripción
   cambiarDescripcion!: FormGroup;
   //Esto sirve para inicializar el formulario reactivo que se utilizara para cambiar el formato
   cambiarFormato!: FormGroup;
   //serive para traer a todos los libros
   libros!:Istock[];
   //este sirve para guardar el libro al cual se le cambiara el stock
   libroCambiarStock:IlibroCambiarStock={
     id_libro:-1,
     nombre: "",
     precio: 0,
     formato: "",
     editorial:-1,
     cantidad:0,
     descripcion:"",
     cantidad_min:-1,
     disponibilidad:1,
   };
   //sirve para guardar todos los libros que su stock esten bajo el minimo
   bajoCantidadMinima:Istock[]=[];
   //sirve para guardar un motivo de salida
   motivo:String="";
   //sirve para guardar la cantidad de libros que se movio
   cantidad!:number;
   //cantidad actual
   cantidadActual!:number;
   //nueva cantidad
   nuevaCantidad:number= this.cantidad+this.cantidadActual;
   //Sirve para saber los autores del stock
   autorStock: Iautor ={
        id_autor: -1,
        nombre: "",
        apellido:""
   }
   //sirve como variable para guardar el dia actual
   LocalDate: Date = new Date();
   //sirve para crear una salida que se agregara por post 
   salidaAgregar: ISalidaAgregar= {
     tipo: "",
     cantidad: -1,
     libro: -1,
     vendedor:1
   }
   //se recupera el usuario actual
   pkActual: number = -1;
   //Se guarda el vendedor actual
   vendedor!:Ivendedor;
   //id vendedor
   idVendedor!:number;
   //guarda los autores
   autor!:Iautor[];
   //se buscan las editoriales;
   editoriales:Ieditorial[] =[];
   //se inicializa el libro
  imagenUpdate!:any;
  //imagen para previsualizar
  imagenPrevisualizacion:String;
  //imagenCargada
  imagenCargada:boolean;
  //se guardan los autores actuales a editar
  autoresActuales:Iautor[]=[]
  //editorialActual a editar
  editorialActual!:Ieditorial;
  //autoresActuales a editar
  autoresId:number[]=[]
  //editorialActual a editar
  editorialId:number=-1;
  //existeAutor a editar
  existeAutor:boolean=false;
  //existeEditorial a editar
  existeEditorial:boolean=false;
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
  //sirve para guardar el filtro stock en minusculas
  filtroStockMinuscula:string='';
  //sirve para guardar el nombre del stock en minusculas
  StockNombreMinuscula:string='';
  //filtro stock;
  filtroStock:string='';
  //librosFiltrados;
  librosFiltrados:Istock[]=[];
  //sirve para guardar los nombres de los libros y sus autores
  nombreLibroAutores:string[]=[];
  //se guarda un libro para ver más
  libro:Istock;
  //sirve para guardar el boolean de ver mas
  verMasVentana: boolean=false;
  //se guarda la copia de los libros
  librosCopia: Istock[];
  //copiaEditoriales
  editorialesCopia: Ieditorial[]
  //autores copia
  autoresCopia:Iautor[]

   //Se inicializa el formulario
   createForm() {
    this.stockCambiar= this._fb.group({
      entradaLetras: ["", Validators.required],
      entradaNumerica: ["", [Validators.required, Validators.pattern("^[0-9]*$")]]
      });
  }
  //se inicializa el formulario para cambiar nombre
  createFormNombre() {
    this.cambiarNombre= this._fb.group({
      entradaLetras: ["", Validators.required]
      });
  }
  //se inicializa el formulario para cambiar Precio
  createFormPrecio() {
    this.cambiarPrecio= this._fb.group({
      entradaNumerica: ["", [Validators.required, Validators.pattern("^[0-9]*$")]]
      });
  }
  //se inicializa el formulario para cambiar cantidad_minima
  createFormCantidad_min() {
    this.cambiarCantidadMinima= this._fb.group({
      entradaNumerica: ["", [Validators.required, Validators.pattern("^[0-9]*$")]]
      });
  }
  //se inicializa el formulario para cambiar Descripción
  createFormDescripción() {
    this.cambiarDescripcion= this._fb.group({
      entradaLetras: ["", Validators.required]
      });
  }
  //se inicializa el formulario para cambiar Formato
  createFormFormato() {
    this.cambiarFormato= this._fb.group({
      entradaLetras: ["", Validators.required]
      });
  }

  ngOnInit(): void {
    //se trae el usuario actual
    this.pkActual=Number(localStorage.getItem("pk"));
    //Se obtiene el vendedor actual
    this.commonService.getUser_vendedor(this.pkActual).subscribe((data:Iuser_vendedor)=>{
      this.vendedor=data.vendedor
    })
        //Se crea el formulario
        this.createForm();
        this.createFormNombre();
        this.createFormCantidad_min();
        this.createFormDescripción();
        this.createFormPrecio();
        this.createFormFormato();

        this.commonService.getStock().subscribe((data:Istock[]) =>   
        {
          this.libros=data.reverse();
          this.librosCopia=data.reverse();
          console.log(this.librosCopia);
          
        })
    this.commonService.getAutor().subscribe((data:Iautor[]) =>   
    {
      this.autor=data.reverse();
      this.autoresCopia=data.reverse();
      
    })
    this.commonService.getEditoriales().subscribe((data:Ieditorial[]) =>   
    {
      this.editoriales=data.reverse();
      this.editorialesCopia=data.reverse();
    })
   }
  
  //Sirve para moverse al HTML de cambiar Stock
  public cambiarStockPestana(libro:Istock){
    this.libroCambiarStock.id_libro=libro.id_libro;
    this.libroCambiarStock.nombre=libro.nombre;
    this.libroCambiarStock.precio=libro.precio;
    this.libroCambiarStock.formato=libro.formato;
    this.libroCambiarStock.editorial=libro.editorial.id_editorial;
    this.libroCambiarStock.cantidad=libro.cantidad;
    this.libroCambiarStock.descripcion=libro.descripcion;
    this.libroCambiarStock.cantidad_min=libro.cantidad_min;
    this.libroCambiarStock.disponibilidad=libro.disponibilidad;
    this.cambiarStock=true;
  }

  restablecerStock(){
    this.commonService.getStock().subscribe((data:Istock[]) =>   
    {
      this.libros=data.reverse();
    }); 
  }

  //se crea un cambio de Stock y se llama a los servicios requeridos Put de libro y post de salida
  public crearCambiarStock(){
      console.log (this.vendedor)
      this.salidaAgregar.vendedor=this.vendedor.id_vendedor;
      console.log(this.salidaAgregar.vendedor);
      this.salidaAgregar.cantidad=this.cantidad
      this.salidaAgregar.libro=this.libroCambiarStock.id_libro
      this.salidaAgregar.tipo=this.motivo
      if(this.cantidad>this.libroCambiarStock.cantidad && (this.motivo=="Retiro de Stock" ||this.motivo == "Venta")){
        Swal.fire('Stock Insuficiente','El stock ingresado sobrepasa el actual');
      }else{
        if(this.motivo=="Retiro de Stock" ||this.motivo == "Venta"){
            this.libroCambiarStock.cantidad-=this.cantidad;
            if(this.libroCambiarStock.cantidad<this.libroCambiarStock.cantidad_min){
              this.commonService.postSalidas(this.salidaAgregar).subscribe()
              this.commonService.putLibro(this.libroCambiarStock).subscribe(data=>{
              Swal.fire('Operación exitosa','Se ha quitado el stock exitosamente, pero el número de ejemplares es inferior al deseado')}
              )
              
            }else{
              this.commonService.postSalidas(this.salidaAgregar).subscribe()
              this.commonService.putLibro(this.libroCambiarStock).subscribe(data=>{
                Swal.fire('Operación exitosa','se ha quitado el stock exitosamente');
              }
              )
            }

        }else{
            this.libroCambiarStock.cantidad+=Number(this.cantidad)
            this.commonService.postSalidas(this.salidaAgregar).subscribe()
            this.commonService.putLibro(this.libroCambiarStock).subscribe(data=>{
              Swal.fire('Operación exitosa','se ha agregado el stock exitosamente');
            }
            )
        }
        this.restablecerStock()  
      }
  }
  //sirve para volver al html de stock
  public volverStock(){
    this.ngOnInit();
    this.cambiarStock=false;
  }
  //sirve para volver de Stock minimo a Stock
  volverStockDesdeMinimo(){
    this.bajoStock=false;
  //Se limpia el stock minimo
    this.bajoCantidadMinima=[];
  }
  //sirve para ir a Stock bajo
  irABajoStock(){
    this.bajoStock=true;
        for(let i=0;i<this.libros.length;i++){
            if (this.libros[i].cantidad < this.libros[i].cantidad_min){
              if(this.libros!==undefined){
                this.bajoCantidadMinima.push(this.libros[i]);
              }
            }
        }
    }
   //se usa para crear el pdf 
    public openPDF():void {
      let DATA = document.getElementById('htmlData');
        
      html2canvas(DATA).then(canvas => {
          
          let fileWidth = 208;
          let fileHeight = canvas.height * fileWidth / canvas.width;
          
          const FILEURI = canvas.toDataURL('image/png')
          let PDF = new jsPDF('p', 'mm', 'a4');
          let position = 0;
          PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
          
          PDF.save();
      });     
    }
    //sirve para editar el nombre del libro
    editarNombre(){
        this.libroCambiarStock.nombre=this.nombre
        this.commonService.putLibro(this.libroCambiarStock).subscribe(data=>{
          Swal.fire('Operación exitosa','El nombre ha sido editado');
        })
    }
    //Se utiliza para editar el precio del libro
    editarPrecio(){
        this.libroCambiarStock.precio=this.precio
        this.commonService.putLibro(this.libroCambiarStock).subscribe(data=>{
          Swal.fire('Operación exitosa','El precio ha sido editado');
        })
    }
    //se utiliza para cambiar el stock minimo del libro
    editarCantidad_Min(){
        this.libroCambiarStock.cantidad_min=this.cantidad_min;
        this.commonService.putLibro(this.libroCambiarStock).subscribe(data=>{
          Swal.fire('Operación exitosa','El stock minimo ha sido editado');
        })
    }
    //se utiliza para cambiar la descripción
    editarDescripcion(){
        this.libroCambiarStock.descripcion=this.descripcion
        this.commonService.putLibro(this.libroCambiarStock).subscribe(data=>{
          Swal.fire('Operación exitosa','la descripción ha sido cambiada');
        })
    }
    //es usado para cambiar el formato
    editarFormato(){
        this.libroCambiarStock.formato=this.formato
        this.commonService.putLibro(this.libroCambiarStock).subscribe(data=>{
          Swal.fire('Operación exitosa','El formato ha sido cambiado');
        })
    }
    //Se utiliza para guardar el libro que se va a editar en una variable llamada libro cambios
    cambiarVentanaEditar(libro:Istock){
      this.ventanaEditar=true;
      this.libroEditar=libro;
      this.libroCambiarStock.id_libro=this.libroEditar.id_libro
      this.libroCambiarStock.nombre=this.libroEditar.nombre
      this.libroCambiarStock.precio=this.libroEditar.precio
      this.libroCambiarStock.editorial=this.libroEditar.editorial.id_editorial
      this.libroCambiarStock.cantidad_min=this.libroEditar.cantidad_min
      this.libroCambiarStock.cantidad=this.libroEditar.cantidad
      this.libroCambiarStock.descripcion=this.libroEditar.descripcion
      this.libroCambiarStock.disponibilidad=this.libroEditar.disponibilidad
      this.libroCambiarStock.formato=this.libroEditar.formato

    }

    volverAStock(){
      this.ventanaEditar=false
      this.ngOnInit()
    }
    editarImagen(){
      const formularioImagen = new FormData();
      formularioImagen.append('imagen', this.imagenUpdate, this.imagenUpdate.name)
      formularioImagen.append('nombre', String(this.libroCambiarStock.nombre))
      formularioImagen.append('cantidad',this.libroCambiarStock.cantidad.toString())
      formularioImagen.append('cantidad_min', this.libroCambiarStock.cantidad_min.toString())
      formularioImagen.append('descripcion',String(this.libroCambiarStock.descripcion))
      formularioImagen.append('disponibilidad',"1")
      formularioImagen.append('formato', String(this.libroCambiarStock.formato))
      formularioImagen.append('precio', this.libroCambiarStock.precio.toString())

      this.commonService.putLibroImagen(formularioImagen, this.libroCambiarStock.id_libro).subscribe(data=>{
        Swal.fire('Operación exitosa','la imagen fue cambiada');
      })
    }

  cargarImagen(event: any){
    let archivo =event.target.files[0]
    this.imagenCargada=true;
    this.extraerBase64(archivo).then((imagen:any) => {
      this.imagenPrevisualizacion=imagen.base;
      console.log(imagen)
    })
    this.imagenUpdate=archivo;
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

  restablecerAutores(){
    this.commonService.getAutor().subscribe((data:Iautor[]) =>   
    {
      this.autor=data;
    }); 
  }
  restablecerEditoriales(){
    this.commonService.getEditoriales().subscribe((data:Ieditorial[]) =>   
    {
    this.editoriales=data;
    }); 
  }
  limpiarAutores(){
    this.autoresId=[];
    this.autoresActuales=[];
    this.existeAutor=false;
  }
  filtrarAutores(){
    console.log("aca estan los autores copia")
    this.autor=this.autoresCopia
    if(this.filtro!=""){
      for (let i=0; i<this.autor?.length; i++){
      this.filtroMinusculas=this.filtro.toLowerCase();
      this.autorNombreMinuscula=this.autor[i].nombre.toLowerCase()+this.autor[i].apellido.toLowerCase();

              if(this.autorNombreMinuscula.includes(this.filtroMinusculas)){
                  this.autoresFiltrados.push(this.autor[i])
              }   
          }
          this.autor=this.autoresFiltrados; 
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

   agregarAutor(autor:Iautor){
    let existeAutorAgregar=false;
    for(let i=0; i < this.autoresActuales.length; i++){
      if(this.autoresActuales[i].id_autor==autor.id_autor){
        Swal.fire('El autor ya existe fue agregado');
        existeAutorAgregar=true  
      }else{
        existeAutorAgregar=false  
      }
    }
    if(existeAutorAgregar==false){
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

 editarAutores(){
    this.libroEditar.autor=this.autoresId;
    this.commonService.putLibroAutor(this.libroEditar).subscribe(data=>{
      Swal.fire('Operación exitosa','los autores han sido cambiados con exito');
    })
}

 editarEditorial(){
    this.libroCambiarStock.editorial=this.editorialActual.id_editorial
    this.commonService.putLibro(this.libroCambiarStock).subscribe(data=>{
      Swal.fire('Operación exitosa','la editorial ha sido cambiada con exito');
    })
 }

 filtrarStock(){
    this.libros=this.librosCopia
    if(this.filtroStock!=""){
      this.filtroStockMinuscula=this.filtroStock.toLowerCase();
    for (let i=0; i<this.libros.length; i++){
     this.nombreLibroAutores.push(this.libros[i].nombre)
      for(let x=0; x<this.libros[i].autor.length ; x++){
        for(let y=0; y<this.autor.length;y++){
            if(this.autor[y].id_autor===this.libros[i].autor[x]){
              this.nombreLibroAutores.push(String(this.autor[y].nombre))
              this.nombreLibroAutores.push(String(this.autor[y].apellido))
                      }   
                }
            }
            for(let u=0; u<this.nombreLibroAutores.length;u++){
              this.StockNombreMinuscula=this.nombreLibroAutores[u].toLowerCase();
              if(this.StockNombreMinuscula.includes(this.filtroStockMinuscula)){
                this.librosFiltrados.push(this.libros[i])
          }
            }
        this.nombreLibroAutores=[]
      }
      
          console.log(this.librosFiltrados);
          this.libros=this.librosFiltrados; 
          this.librosFiltrados=[]
    }
}

//sirve para volver a mostrar todas las editoriales
restablecerStockActual(){
    this.libros=this.librosCopia
}

verMas(libro: Istock){
  this.verMasVentana=true;
  this.libro=libro
}

volverAStockDesdeVerMas(){
this.verMasVentana=false;
}

}