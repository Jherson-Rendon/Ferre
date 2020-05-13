import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Producto, Categoria } from '../../interface/producto';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  public unsubscribe$ = new Subject<void>();


  private productosCollection: AngularFirestoreCollection<Producto>;
  private categoriaCollection: AngularFirestoreCollection<Categoria>;
  private numProductos: number;

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore) {
    this.productosCollection = afs.collection<Producto>('productos');
    this.categoriaCollection = afs.collection<Categoria>('categorias');
  }

  getCategorias() {
    return this.categoriaCollection.valueChanges();
  }

  uploadImage(producto: Producto) {
    this.countProductos();
    const ref = this.numProductos + 1;
    const filePath = `imagenes/productos/producto_${ref}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, producto.img);

    return { imagen: task.snapshotChanges().pipe(
      finalize( () => {
        fileRef.getDownloadURL().pipe( takeUntil(this.unsubscribe$) ).subscribe( urlImage => {
          producto.ref = ref;
          producto.img = urlImage;
          return this.gurdarProducto(producto);
        });
      })
    ).pipe( takeUntil(this.unsubscribe$) ).subscribe(), carga: task.percentageChanges()};
  }

  async countProductos() {
    try {
      return await this.productosCollection.ref.get().then( data => {
        this.numProductos = data.size;
        return data.size;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async gurdarProducto(producto: Producto) {
    const id = this.afs.createId();
    producto.id = id;

    try {
      return await this.afs.collection('productos').doc(id).set(JSON.parse(JSON.stringify(producto))).then( () => {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        return true;
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async agregarCategoria(nombre: string) {
    try {
      const categorie = await this.categoriaCollection.ref.get().then( res => res.size) + 1;
      const id = this.afs.createId();
      const data = { id, nombre, categorie };

      return await this.categoriaCollection.doc(id).set(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      console.log(error);
    }
  }
}
