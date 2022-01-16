import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iautor, IautorAgregar, Iautores, IautoresStock, Ieditorial, IeditorialAgregar, Ilibro, IlibroCambiarStock, Isalida, ISalidaAgregar, ISalidaGet, Istock, Iuser, Iuser_vendedor, Ivendedor } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class commonService {
   
  constructor(private http:HttpClient) { 

  }

        public getStock():Observable<Istock[]> {
             return this.http.get<Istock[]>('http://127.0.0.1:8000/libro/editorial');
            
        }

         public getLibros():Observable<Ilibro[]> {
            
            return this.http.get<Ilibro[]>('http://127.0.0.1:8000/libro');
         
        }

        public getLibroById(idLibro: number):Observable<Ilibro> {
            
            return this.http.get<Ilibro>('http://127.0.0.1:8000/libro/'+idLibro);
         
        }

        public delLibro(idLibro: number) {
            
            return this.http.delete('http://127.0.0.1:8000/libro/'+idLibro);
         
        }

        public postLibro(libro:Ilibro): Observable <Ilibro> {

            return this.http.post<Ilibro>('',libro);

        }

        public putLibro(libro:IlibroCambiarStock): Observable <Ilibro> {

            return this.http.put<Ilibro>('http://127.0.0.1:8000/libro/'+libro.id_libro, libro);

        }

        public getAutores():Observable<IautoresStock[]> {
            
            return this.http.get<IautoresStock[]>('http://127.0.0.1:8000/autores/libro_autor');
         
        }

        public getAutoresById(id:number):Observable<Iautores[]> {
            
            return this.http.get<Iautores[]>('http://127.0.0.1:8000/autores/'+ id);
         
        }

        public getAutor():Observable<Iautor[]> {
            
            return this.http.get<Iautor[]>('http://127.0.0.1:8000/autor');
         
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
        
        public delAutor(idAutor: number) {
            return this.http.delete('http://127.0.0.1:8000/autor/'+idAutor);
         
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

        public getSalidas():Observable<Isalida[]> {
            
            return this.http.get<Isalida[]>('http://127.0.0.1:8000/salida');
         
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

    }
