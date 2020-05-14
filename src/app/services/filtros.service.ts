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
    this.producService.getProductos().subscribe( producto => {
      this.productos = producto;
    });
    this.producService.getCategorias().subscribe( categoria => {
      this.categorias = categoria;
    });
  }

  getProdutsFilter() {
    return of(this.productos).toPromise();
  }

  buscarProducto(search: string) {
    if (search.length < 3 || search === '') {
      return this.productos;
    }
    const expresion = new RegExp(`${search}.*`, 'i');
    return this.productos.filter( fill => expresion.test(fill.nombre));
  }

  filtrarProductosByCategoria(fill: string) {
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

  filtrarProductosByPrecio(min: number, max: number) {
    return this.productos.filter( producto => producto.precio >= min && producto.precio <= max);
  }

  ordenarProductosByPrecioMenor(): Producto[] {
    return this.productos.sort( (productoA, productoB) => productoA.precio - productoB.precio);
  }

  ordenarProductosByPrecioMayor(): Producto[] {
    return this.productos.sort( (productoA, productoB) => productoB.precio - productoA.precio);
  }

  ordenarProductosByAZ(): Producto[] {
    return this.sortJSON(this.productos, 'nombre', 'asc');
  }

  ordenarProductosByZA(): Producto[] {
    return this.sortJSON(this.productos, 'nombre', 'desc');
  }

  sortJSON(data, key, orden) {
    return data.sort( (a: Producto, b: Producto) => {
      const x = a[key];
      const y = b[key];

      if (orden === 'asc') {
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }

      if (orden === 'desc') {
          return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
    });
  }
}
