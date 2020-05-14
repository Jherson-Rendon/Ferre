import { Injectable } from '@angular/core';
import * as dataProductos from '../../assets/data/productos.json';
import { Producto, Categoria } from '../interface/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutsService {

  private productosCollection: AngularFirestoreCollection<Producto>;
  private categoriasCollection: AngularFirestoreCollection<Categoria>;
  private productos: Producto[];
  private categorias: Categoria[];
  public dataProducto: Producto[];
  public dataCategoria: Categoria[];
  public Producto: Producto;

  constructor(private afs: AngularFirestore) {
    this.productosCollection = this.afs.collection<Producto>('productos');
    this.categoriasCollection = this.afs.collection<Categoria>('categorias');
  }

  getProductos() {
    if (this.productos && this.productos.length > 0) {
      return of(this.productos);
    } else {
      return this.productosCollection.valueChanges().pipe(
        tap( data => { this.productos = data; })
      );
    }
  }

  getCategorias() {
    if (this.categorias && this.categorias.length > 0) {
      return of(this.categorias);
    } else {
      return this.categoriasCollection.valueChanges().pipe(
        tap( data => { this.categorias = data; })
      );
    }
  }

  async getDataProductoById(id: string): Promise<Producto[]> {
    return (await this.productosCollection.ref.where('id', '==', id).get()).docs.map( data => {
      return data.data() as Producto;
    });
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
