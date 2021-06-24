import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'bKyrzy1twbyIoEp9E89TKDPiPykawPvR';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){
    //cargar del LocalStorage: OPCION 1
    this.resultados = JSON.parse( localStorage.getItem('ultimosResultados')! ) || [];
    this._historial = JSON.parse( localStorage.getItem('gifsHistorial')! ) || [];
    
    
    // cargar del LocalStorage: OPCION 2
    // if(  localStorage.getItem('gifsHistorial') ){
    //   this._historial = JSON.parse( localStorage.getItem('gifsHistorial')! )
    // }
  }

  buscarGifs( query: string ): void{
    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice( 0, 12 );
      

      // Grabar en LocalStorage
      localStorage.setItem('gifsHistorial', JSON.stringify(this._historial));
    }


    const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '12')
            .set('q', query);            

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe( resp =>{
        this.resultados = resp.data;
        localStorage.setItem( 'ultimosResultados', JSON.stringify( this.resultados ));
      });
    }
  
}
