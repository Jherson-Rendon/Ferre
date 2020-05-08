import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  private uploadPercent: Observable<number>;
  private urlImagen: Observable<string>;

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore) { }

  uploadImage(file: any) {
    const id = new Date().valueOf();
    const filePath = `imagenes/productos/producto_${id}`;
    const refStorage = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize( () => this.urlImagen = refStorage.getDownloadURL()) ).subscribe();

    return { porcenta: this.uploadPercent, urlImagen: this.urlImagen };
  }

  gurdarProducto(producto: any) {
    return this.afs.collection('productos').add(JSON.parse(JSON.stringify(producto)));
    // JSON.parse(JSON.stringify(usuario))
  }
}
