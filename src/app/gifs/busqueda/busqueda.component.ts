import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

 

  ngOnInit(): void {
  }
//  buscar(event:KeyboardEvent) para recibir los datos del event 

// se coloca el ! al final para decirle al lenguaje que ese dato no es nulo

@ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

constructor(private GifsService: GifsService) {}

buscar(){
  // pasos para dejar vacio el input

  const txtvalor = this.txtBuscar.nativeElement.value;

  //evitar que el valor txtvalor ingrese vacio
  
  if (txtvalor.trim().length === 0) {
    alert("ingrese un valor valido en el buscador");
    return;
  }

  this.GifsService.buscarGifs(txtvalor);
  
  //  se retorna el txtBuscar  vacio en el input 
    this.txtBuscar.nativeElement.value = '';
  }
}
