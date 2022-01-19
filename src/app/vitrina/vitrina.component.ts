import { Component, OnInit } from '@angular/core'
import { Iautor, Istock } from '../interfaces/interfaces';
import { commonService } from '../service/common.service';


@Component({
  selector: 'app-vitrina',
  templateUrl: './vitrina.component.html',
  styleUrls: ['./vitrina.component.css']
})
export class VitrinaComponent implements OnInit {
  
  //Se guardan los autores
  autor:Iautor[];
  filtroStockMinuscula:string='';
  //sirve para guardar el nombre del stock en minusculas
  StockNombreMinuscula:string='';
  //filtro stock;
  filtroStock:string='';
  //librosFiltrados;
  librosFiltrados:Istock[]=[];
  //sirve para guardar los nombres de los libros y sus autores
  nombreLibroAutores:string[]=[];
  //habilitar ver más
  verMasVentana:boolean=false;
  //libro donde se guarda el que se vera más
  libro:Istock;
  //libreriaActual
  librosCopia:Istock[];

  constructor(private commonService: commonService) { 
  }
  libros:Istock[];
  ngOnInit(): void {
        //se cargan los libros para la vitrina
        this.commonService.getStock().subscribe((data:Istock[]) =>   
          {
            this.libros=data.reverse();
            this.librosCopia=data.reverse();
            console.log(this.libros);
          })
          
        this.commonService.getAutorVitrina().subscribe((data:Iautor[]) =>   
          {
            this.autor=data.reverse();
            console.log(this.autor);
          })
  }

  filtrarStock(){
    this.libros=this.librosCopia
    console.log(this.librosCopia)
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
  //sirve para volver a mostrar todas los ejemplares
restablecerStockActual(){
  this.commonService.getStock().subscribe((data:Istock[]) =>   
  {
  this.libros=data.reverse();
  }); 
}

verMas(libro: Istock){
    this.verMasVentana=true;
    this.libro=libro
}

volverAVitrina(){
  this.verMasVentana=false;
}

}

