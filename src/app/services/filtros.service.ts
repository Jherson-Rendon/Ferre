import { Injectable } from '@angular/core';
import { ProdutsService } from './produts.service';
import { Producto } from '../interface/producto';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  public productos: Producto[];

  constructor(private producService: ProdutsService) {
    this.productos = this.producService.getDataProducto();

  }

  getProdutsFilter() {
    return of(this.productos).toPromise();
  }

  buscarProducto(search: string) {
    const expresion = new RegExp(`${search}.*`, 'i');
    return this.productos.filter( fill => expresion.test(fill.nombre));
  }
}
