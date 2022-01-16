
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {Iautor, Iautores, IautoresStock, Ieditorial, Ilibro, IlibroCambiarStock, Isalida, ISalidaAgregar, Istock, Iuser, Iuser_vendedor, Ivendedor} from '../interfaces/interfaces';
import { commonService } from '../service/common.service';
import { DatePipe } from '@angular/common'
import { InformacionServiceService } from '../service/informacion-service.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  constructor(private _fb: FormBuilder,private commonService: commonService,public datepipe: DatePipe, private informacionService:InformacionServiceService) {

   }
   //esto es para mostrar que nos vamos al html correspondiente a bajo stock
   bajoStock:boolean=false;
   //sirve para ir a cambiar stock
   cambiarStock:boolean=false;
   //Esto sirve para inicializar el formulario reactivo que se utilizara para cambiar el stocl
   stockCambiar!: FormGroup;
   //serive para traer a todos los libros
   libros!:Istock[];
   //se buscan los autores
   autores!:IautoresStock[];
   //se buscan los autores;
   autoresNombres:Iautor[] =[];
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
   LocalDateFormat!: Date;
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

   //Se inicializa el formulario
   createForm() {
    this.stockCambiar= this._fb.group({
      entradaLetras: ["", Validators.required],
      entradaNumerica: ["", [Validators.required, Validators.pattern("^[0-9]*$")]]
      });
  }


  ngOnInit(): void {
    console.log(this.datepipe.transform(this.LocalDate,'yyyy-MM-dd'));
    //se trae el usuario actual
    this.pkActual=Number(localStorage.getItem("pk"));
    //Se obtiene el vendedor actual
    this.commonService.getUser_vendedor(this.pkActual).subscribe((data:Iuser_vendedor)=>{
      this.vendedor=data.vendedor
    })
    //Se crea el formulario
    this.createForm();
    this.tenerAutoresString;
    this.commonService.getStock().subscribe((data:Istock[]) =>   
    {
      this.libros=data.reverse();
      
    })
    this.commonService.getAutor().subscribe((data:Iautor[]) =>   
    {
      this.autor=data.reverse();
      
    })
   }

   //Se llama a los libros en una promesa
   getLibros= () => {
    return new Promise((resolve)=>{
      this.commonService.getStock().subscribe((data:Istock[]) =>   
    {
      this.libros=data.reverse();
      console.log(this.libros);
      
    })
    resolve(this.libros)
    })
  }
  //Se llama a los autores en una promesa
  getAutores= () => {
    return new Promise((resolve)=>{
      this.commonService.getAutores().subscribe((data:IautoresStock[]) =>   
    {
      this.autores=data.reverse();
      console.log(this.autores);
      
    })
    resolve(this.autores)
    })
  }

  async tenerAutoresString(){
    await this.getAutores()
    await this.getLibros()
    console.log("aca toy")    
    for(let i=0;i<this.libros.length;i++){
      for(let y=0;y<this.autores.length;y++){
        console.log(this.libros[i].id_libro)
          if(this.autores[y].id_libro_a.id_libro=this.libros[i].id_libro){
              this.autoresNombres.push(this.autores[y].id_autor_a);
          }
      }
      this.libros[i].autores=this.autoresNombres;
    }
    this.autoresNombres=[];
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
    
    public openPDF():void {
      let DATA = document.getElementById('htmlData');
        
      html2canvas(DATA).then(canvas => {
          
          let fileWidth = 208;
          let fileHeight = canvas.height * fileWidth / canvas.width;
          
          const FILEURI = canvas.toDataURL('image/png')
          let PDF = new jsPDF('p', 'mm', 'a4');
          let position = 0;
          PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
          
          PDF.save('angular-demo.pdf');
      });     
    }
  }

