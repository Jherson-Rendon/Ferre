import { Injectable } from '@angular/core';
import * as dataProducto from '../../assets/data/productos.json';

@Injectable({
  providedIn: 'root'
})
export class ProdutsService {
  public dataProducto: {};

  constructor() {
    this.dataProducto = dataProducto;
  }

  getDataProducto() {
    return this.dataProducto;
  }
}
