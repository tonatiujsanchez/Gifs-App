import { Component, ElementRef, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ){}

  buscar(){
    let texto: string = this.txtBuscar.nativeElement.value;
    if( texto.trim().length === 0 ){
      return;
    }

    this.gifsService.buscarGifs( texto );
    this.txtBuscar.nativeElement.value = '';
  }

}
