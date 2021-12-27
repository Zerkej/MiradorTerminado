import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iautor, IautoresBusqueda, Ieditorial, Ilibro, Ilibros } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class commonService {

  constructor(private http:HttpClient) { 

  }
         public getLibros():Observable<Ilibro[]> {
            
            return this.http.get<Ilibro[]>('http://127.0.0.1:8000/libro');
         
        }

        public getLibro(idLibro: number):Observable<Ilibro> {
            
            return this.http.get<Ilibro>('');
         
        }

        public getAutores():Observable<IautoresBusqueda> {
            
            return this.http.get<IautoresBusqueda>('');
         
        }

        public getAutoresPorLibro(idLibro: number):Observable<IautoresBusqueda> {
            
            return this.http.get<IautoresBusqueda>('');
         
        }

        public getAutor(idAutor: number):Observable<Iautor> {
            
            return this.http.get<Iautor>('');
         
        }

        public getEditoriales():Observable<Ieditorial[]> {
            
            return this.http.get<Ieditorial[]>('http://127.0.0.1:8000/editorial');
         
        }
        
}