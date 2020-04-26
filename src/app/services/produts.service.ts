import { Injectable } from '@angular/core';
import * as dataProductos from '../../assets/data/productos.json';
import { Producto, Categoria } from '../interface/producto';

@Injectable({
  providedIn: 'root'
})
export class ProdutsService {
  public dataProducto: Producto[];
  public dataCategoria: Categoria[];
  public Producto: Producto;

  constructor() {
    this.dataProducto = dataProductos.productos;
    this.dataCategoria = dataProductos.categorias;
  }

  getDataProducto() {
    return this.dataProducto;
  }

  getDataCategoria() {
    return this.dataCategoria;
  }

  getDataProductoByRef(referencia: number): Producto {
    this.dataProducto.forEach(producto => {
      // tslint:disable-next-line:triple-equals
      if (producto.ref == referencia) {
        this.Producto = producto;
      }
    });
    return this.Producto;
  }
}
