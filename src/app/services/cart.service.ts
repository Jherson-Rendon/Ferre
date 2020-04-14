import { Injectable } from '@angular/core';
import { ProductoCart } from '../interface/producto-cart';
import { Observable } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';

export interface Response { err: boolean; mensaje: string; }

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public items: string;
  public productos: ProductoCart[];
  public productoExiste = false;

  constructor(protected localStorage: LocalStorage) { }

  crearItem(item: ProductoCart): Response {
    const productos = this.getProductos();
    if (productos) {
      const ifProducto = this.existeProducto(item.ref);
      console.log('if Producto', ifProducto);

      if (ifProducto) {
        return { err: true, mensaje: 'El producto ya se encuentra en el carrito' };
      } else {
        this.productos = productos;
        this.productos.push(item);
        this.setProducto(this.productos);
        return { err: false, mensaje: 'Producto agregado' };
      }
    } else {
      this.productos = new Array();
      this.productos.push(item);
      this.setProducto(this.productos);
      return { err: false, mensaje: 'Producto agregado' };
    }
  }


  existeProducto(referencia: number): boolean {
    const productos = this.getProductos();

    if (productos) {
      console.log('Si hay productos');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        if (producto.ref === referencia) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }

  setProducto(producto: ProductoCart[]): void {
    localStorage.setItem('productos', JSON.stringify(producto));
  }

  getProductos(): ProductoCart[] {
    return JSON.parse(localStorage.getItem('productos'));
  }

  getItems() {
    this.localStorage.getItem('productos').subscribe((producto) => {
      console.log('si hay productos');
      if (producto != null) {
        this.productos = producto;
        return { err: false, data: this.getProductos() };
      }
      return { err: true, mensaje: 'No existe productos' };
    }, (err) => {
      return { err: true, mensaje: err };
    });
  }
}
