import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html'
})
export class SiderbarComponent implements OnInit {

  get historial(){
    return this.gifsService.historial;
  }

  constructor( private gifsService: GifsService ) { }

  ngOnInit(): void {
    
  }

  buscarGifs( termino:string ):void{
    this.gifsService.buscarGifs( termino );
  }

}
