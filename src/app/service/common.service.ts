import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iautor, IautorAgregar, Iautores, IautoresStock, Ieditorial, IeditorialAgregar, Ilibro, IlibroCambiarStock, Isalida, ISalidaAgregar, ISalidaGet, Istock, IstockPost, Iuser, Iuser_vendedor, Ivendedor } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class commonService {
   
  constructor(private http:HttpClient) { 

  }

        public getStock():Observable<Istock[]> {
             return this.http.get<Istock[]>('http://127.0.0.1:8000/libro/editorial');
            
        }

        public putLibro(libro:any): Observable <Ilibro> {

            return this.http.put<Ilibro>('http://127.0.0.1:8000/libro/'+libro.id_libro, libro);

        }

        public putLibroImagen(libro:any, id:number): Observable <Ilibro> {

            return this.http.put<Ilibro>('http://127.0.0.1:8000/libro/editar_libro/sin_editorial/'+id, libro);

        }

        public putLibroAutor(libro:any): Observable <Ilibro> {

            return this.http.put<Ilibro>('http://127.0.0.1:8000/libro/editar_libro/sin_editorial_imagen/'+libro.id_libro, libro);

        }




        public getAutor():Observable<Iautor[]> {
            
            return this.http.get<Iautor[]>('http://127.0.0.1:8000/autor');
         
        }

        public getAutorVitrina():Observable<Iautor[]> {
            
            return this.http.get<Iautor[]>('http://127.0.0.1:8000/autor/vitrina');
         
        }



        public getAutorById(id:number):Observable<Iautor> {
            
            return this.http.get<Iautor>('http://127.0.0.1:8000/autor/'+id);
         
        }

        public postAutor(autor:IautorAgregar) {
            return this.http.post('http://127.0.0.1:8000/autor',autor);
         
        }

        public putAutor(autor:Iautor): Observable <Iautor> {
            console.log("aca estoy dentro del servicio")
            return this.http.put<Iautor>('http://127.0.0.1:8000/autor/'+autor.id_autor,autor);
         
        } 

        public getEditoriales():Observable<Ieditorial[]> {
        
            return this.http.get<Ieditorial[]>('http://127.0.0.1:8000/editorial');
         
        }

        public getEditorialById(id:number):Observable<Ieditorial> {
            
            return this.http.get<Ieditorial>('http://127.0.0.1:8000/editorial/'+id);
         
        }

        public putEditorial(editorial:Ieditorial): Observable <Ieditorial> {

            return this.http.put<Ieditorial>('http://127.0.0.1:8000/editorial/'+editorial.id_editorial, editorial);

        }

        public postEditoriales(editorial:IeditorialAgregar) {
            return this.http.post('http://127.0.0.1:8000/editorial',editorial);
         
        }


        public getSalidasCompleta():Observable<ISalidaGet[]> {
            
            return this.http.get<ISalidaGet[]>('http://127.0.0.1:8000/salida/libro_vendedor');
         
        }


        public postSalidas(salida:ISalidaAgregar):Observable<Isalida[]> {
            
            return this.http.post<Isalida[]>('http://127.0.0.1:8000/salida',salida);
         
        }

        public putSalida(salida:Isalida): Observable <Isalida> {

            return this.http.put<Isalida>('http://127.0.0.1:8000/salida/'+salida.id_salida, salida);

        }

        public getUser_vendedor(pk: number):Observable<Iuser_vendedor> {
            return this.http.get<Iuser_vendedor>('http://127.0.0.1:8000/user/'+ pk);
         
        }

        public postStock(libro: FormData) {
            return this.http.post('http://127.0.0.1:8000/libro/crear_libro', libro);
         
        }

    }
