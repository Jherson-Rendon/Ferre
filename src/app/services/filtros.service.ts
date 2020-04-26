import { Injectable } from '@angular/core';
import { ProdutsService } from './produts.service';
import { Producto, Categoria } from '../interface/producto';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  public productos: Producto[];
  public categorias: Categoria[];

  constructor(private producService: ProdutsService) {
    this.productos = this.producService.getDataProducto();
    this.categorias = this.producService.getDataCategoria();
  }

  getProdutsFilter() {
    return of(this.productos).toPromise();
  }

  buscarProducto(search: string) {
    const expresion = new RegExp(`${search}.*`, 'i');
    return this.productos.filter( fill => expresion.test(fill.nombre));
  }

  filtrarProductos(fill: string) {
    return this.productos.filter( producto => this.productoCategoria(producto.categoria, fill));
  }

  productoCategoria(cat: number[], fill: string): boolean {
    if (fill === 'all') {
      return true;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < cat.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.categorias.length; j++) {
        if (this.categorias[j].categorie === fill) {
          if (this.categorias[j].id === cat[i]) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
