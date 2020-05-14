import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConexionService } from '../../services/conexion.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Producto, Categoria } from 'src/app/interface/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  private fileImagen: any;
  public loader = false;
  public imgName = 'Seleccionar imagen';
  public porcentaje = 0;
  public categorias: Observable<Categoria[]>;

  public productosForm = new FormGroup({
    imagen: new FormControl('', [Validators.required, this.fileValidation]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    precio: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(9)]),
    categoria: new FormControl('', Validators.required),
    cantidad: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(500)])
  });

  get imagen(): AbstractControl { return this.productosForm.get('imagen'); }
  get nombre(): AbstractControl { return this.productosForm.get('nombre'); }
  get precio(): AbstractControl { return this.productosForm.get('precio'); }
  get categoria(): AbstractControl { return this.productosForm.get('categoria'); }
  get cantidad(): AbstractControl { return this.productosForm.get('cantidad'); }
  get descripcion(): AbstractControl { return this.productosForm.get('descripcion'); }

  constructor(private conexion: ConexionService) {
    this.categorias = this.conexion.getCategorias();
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async cargarImagen(event) {
    this.fileImagen = event.target.files[0];
    this.imgName = event.target.files[0].name;
  }

  guardarProducto() {
    this.loader = true;
    const cantidad = Number(this.cantidad.value.toString().replace(/[^0-9]/g, ''));
    const precio = Number(this.precio.value.toString().replace(/[^0-9]/g, ''));

    const data: Producto = {
      img: this.fileImagen,
      show: true,
      hover: false,
      nombre: this.nombre.value,
      precio,
      minDes: this.descripcion.value.substr(0, 16) + '...',
      fullDes: this.descripcion.value,
      cantidad,
      precioAnt: this.precio.value,
      categoria: this.categoria.value
    };

    const response = this.conexion.uploadImage(data);

    response.then( pro => {
      pro.carga.pipe( takeUntil(this.unsubscribe$) ).subscribe( res => {
        this.porcentaje = Math.round(res);
        if (res === 100) {
          this.loader = false;
          this.productosForm.reset();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se agrego un nuevo producto',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    });
  }

  async nuevaCategoria(): Promise<void> {
    const { value: categoria } = await Swal.fire(
      {
        title: 'Nueva Categoria',
        input: 'text',
        inputPlaceholder: 'Tuberia',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Crear',
        cancelButtonText: 'cancelar',
        inputAttributes: {
          maxlength: '50',
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      }
    );

    if (categoria) {
      this.conexion.agregarCategoria(categoria).then( () => {
        Swal.fire(`Se creo una nueva categoria: ${categoria}`);
        return;
      }, (err) => {
        Swal.fire('Opps!', 'Hubo un problema de conexión', 'error');
        return;
      });
    }
    return;
  }

  fileValidation(control: AbstractControl) {
    const file = control.value;
    const extenciones = /(.jpg|.jpeg|.png|.gif)$/i;
    let error = null;

    if (!extenciones.exec(file)) {
      error = { extencion: true };
    }
    return error;
  }

  // Get Errors
  getErrorMessageImagen(): string {
    let mensaje: string;

    if (this.imagen.hasError('required')) {
      mensaje = 'La imagen del producto es <strong>requerida.</strong>';
    } else if (this.imagen.errors.extencion) {
      mensaje = 'El formato de la imagen es invalido, debe ser (jpg, jpeg, png)';
    }
    return mensaje;
  }

  getErrorMessageNombre(): string {
    let mensaje: string;

    if (this.nombre.hasError('required')) {
      mensaje = 'Nombre es <strong>requerido.</strong>';
    } else if (this.nombre.errors.minlength) {
      mensaje = `Mínimo <strong>${this.nombre.errors.minlength.requiredLength}</strong> caracteres,
      tienes <strong>${this.nombre.errors.minlength.actualLength}</strong>`;
    } else if (this.nombre.errors.maxlength) {
      mensaje = `Máximo <strong>${this.nombre.errors.maxlength.requiredLength}</strong> caracteres,
      tienes <strong>${this.nombre.errors.maxlength.actualLength}</strong>`;
    }
    return mensaje;
  }

  getErrorMessagePrecio(): string {
    let mensaje: string;

    if (this.precio.hasError('required')) {
      mensaje = 'El precio es <strong>requerido.</strong>';
    } else if (this.precio.errors.minlength) {
      mensaje = `Mínimo <strong>${this.precio.errors.minlength.requiredLength}</strong> caracteres,
      tienes <strong>${this.precio.errors.minlength.actualLength}</strong>`;
    } else if (this.precio.errors.maxlength) {
      mensaje = `Máximo <strong>${this.precio.errors.maxlength.requiredLength}</strong> caracteres,
      tienes <strong>${this.precio.errors.maxlength.actualLength}</strong>`;
    }
    return mensaje;
  }

  getErrorMessageCategoria(): string {
    let mensaje: string;

    if (this.categoria.hasError('required')) {
      mensaje = 'La categoria es <strong>requerida.</strong>';
    }
    return mensaje;
  }

  getErrorMessageCantidad(): string {
    let mensaje: string;

    if (this.cantidad.hasError('required')) {
      mensaje = 'La cantidad es <strong>requerida.</strong>';
    } else if (this.cantidad.errors.minlength) {
      mensaje = `Mínimo <strong>${this.cantidad.errors.minlength.requiredLength}</strong> dígito,
      tienes <strong>${this.cantidad.errors.minlength.actualLength}</strong>`;
    } else if (this.cantidad.errors.maxlength) {
      mensaje = `Máximo <strong>${this.cantidad.errors.maxlength.requiredLength}</strong> dígitos,
      tienes <strong>${this.cantidad.errors.maxlength.actualLength}</strong>`;
    }
    return mensaje;
  }

  getErrorMessageDescripcion(): string {
    let mensaje: string;

    if (this.descripcion.hasError('required')) {
      mensaje = 'La descripcion es <strong>requerida.</strong>';
    } else if (this.descripcion.errors.minlength) {
      mensaje = `Mínimo <strong>${this.descripcion.errors.minlength.requiredLength}</strong> caracteres,
      tienes <strong>${this.descripcion.errors.minlength.actualLength}</strong>`;
    } else if (this.descripcion.errors.maxlength) {
      mensaje = `Máximo <strong>${this.descripcion.errors.maxlength.requiredLength}</strong> caracteres,
      tienes <strong>${this.descripcion.errors.maxlength.actualLength}</strong>`;
    }
    return mensaje;
  }
}
