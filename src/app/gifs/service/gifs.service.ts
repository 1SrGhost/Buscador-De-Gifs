import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

    private apiKey : String = 'LFzspiDIeDqI8aAvcAOY7BcPfspPg2Mx';
    private _historial: string[] = [];

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
      
     // con el uso de las comillas ` ` puedo escribir codigo typescript para hacer el uso de la variable query  con el
     // simbolo de $ adelante 

     this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=LFzspiDIeDqI8aAvcAOY7BcPfspPg2Mx&q=${query}&limit=10`)
      .subscribe((resp) => {
        console.log(resp.data);

        this.resultado = resp.data;
        localStorage.setItem('resultado', JSON.stringify(this.resultado));
        
    });

  }
}
