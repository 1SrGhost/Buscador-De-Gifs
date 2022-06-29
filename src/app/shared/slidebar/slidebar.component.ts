import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/service/gifs.service';
import { AppComponent } from '../../app.component';
import { BusquedaComponent } from '../../gifs/busqueda/busqueda.component';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent{

  get historial(){

    return this.gifService.historial;
  }

  constructor(private gifService:GifsService) {  }

  
  buscar(termino:string){
      console.log(termino);
      this.gifService.buscarGifs(termino);
  }
}
