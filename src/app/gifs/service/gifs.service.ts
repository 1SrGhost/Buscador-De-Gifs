/* Es un servicio que realiza solicitudes HTTP a la API de Giphy y almacena los resultados en una
variable local */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

    private apiKey     : string = 'LFzspiDIeDqI8aAvcAOY7BcPfspPg2Mx';
    private servicioUrl:string = 'https://api.giphy.com/v1/gifs';
    private _historial : string[] = [];
    

    public resultado:Gif[] = []

    get  historial(){


      return [...this._historial];
    } 

// se crea el constructor para hacer peticiones http
    constructor(private http:HttpClient){
      if(localStorage.getItem('historial')){
        this._historial = JSON.parse(localStorage.getItem('historial')!);
        this.resultado = JSON.parse(localStorage.getItem('resultado')!);
      }
    }


    buscarGifs(query: string = ''){
      
      query = query.trim().toLocaleLowerCase();

      // se valida que si el valor no existe en el  query se inserte, de lo contrario no
      if(!this._historial.includes(query)){

        this._historial.unshift(query);

      }

      // se definen solo 10 valores de ultima busqueda
      this._historial =  this._historial.splice(0,10);
      

      localStorage.setItem('historial', JSON.stringify(this._historial));
      

/* El código anterior está creando un nuevo objeto HttpParams y configurando los parámetros api_key,
limit y q. */
    const params = new  HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set ('q', query);
     // con el uso de las comillas ` ` puedo escribir codigo typescript para hacer el uso de la variable query  con el
     // simbolo de $ adelante 
    
    


/* Realizar una solicitud a la API de Giphy y obtener los resultados. */
    
     this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`,{params})
      .subscribe((resp) => {
        

        this.resultado = resp.data;
        localStorage.setItem('resultado', JSON.stringify(this.resultado));
        
    });

  }
}
