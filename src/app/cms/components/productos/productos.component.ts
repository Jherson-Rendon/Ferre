import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../services/conexion.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  private fileImagen: any;

  public productosForm = new FormGroup({
    nombre: new FormControl(''),
    precio: new FormControl(''),
    categoria: new FormControl(''),
    cantidad: new FormControl(''),
    descripcion: new FormControl('')
  });
  get nombre(): AbstractControl { return this.productosForm.get('nombre'); }
  get precio(): AbstractControl { return this.productosForm.get('precio'); }
  get categoria(): AbstractControl { return this.productosForm.get('categoria'); }
  get cantidad(): AbstractControl { return this.productosForm.get('cantidad'); }
  get descripcion(): AbstractControl { return this.productosForm.get('descripcion'); }

  constructor(private conexion: ConexionService) { }

  ngOnInit() {
  }

  cargarImagen(event) {
    this.fileImagen = event.target.files[0];
  }

  guardarProducto() {
    const cargarImagen = this.conexion.uploadImage(this.fileImagen);

    cargarImagen.porcenta.subscribe( (data) => {
      if ( data === 100) {
        this.conexion.gurdarProducto(this.productosForm.value);
      }
    });
  }

}
