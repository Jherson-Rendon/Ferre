import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutsService } from 'src/app/services/produts.service';
import { CartService } from 'src/app/services/cart.service';
import { Producto } from 'src/app/interface/producto';
import { ProductoCart } from 'src/app/interface/producto-cart';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  public producto: Producto;

  // tslint:disable-next-line:max-line-length
  constructor(private rutaActiva: ActivatedRoute, public producService: ProdutsService, public cartService: CartService, private router: Router) {
    rutaActiva.params.subscribe(params => {
      const producto = producService.getDataProductoByRef(params.ref);

      if (producto) {
        this.producto = producto;
      } else {
        this.router.navigate(['/error']);
      }
    });
  }

  ngOnInit() {
  }

  agregarProducto(): void {
    const producto: ProductoCart = {
      ref: this.producto.ref,
      nombre: this.producto.nombre,
      precio: this.producto.precio,
      cantidad: Number($('#cantidad').val())
    };
    const respuesta = this.cartService.crearItem(producto);

    if (!respuesta.err) {
      this.alert('success', respuesta.mensaje);
      ($('#shoppingCart') as any).modal('show');
    } else {
      this.alert('warning', respuesta.mensaje);
    }
  }

  alert(icono: string, mensaje: string) {
    Swal.fire({
      position: 'top-end',
      icon: (icono as any),
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    });
  }

}
