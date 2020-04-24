import { Injectable } from '@angular/core';
import * as dataProducto from '../../assets/data/productos.json';
import { Producto } from '../interface/producto';

@Injectable({
  providedIn: 'root'
})
export class ProdutsService {
  public dataProducto: Producto[];
  public Producto: Producto;

  constructor() {
    this.dataProducto = dataProducto.productos;
  }

  getDataProducto() {
    return this.dataProducto;
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
