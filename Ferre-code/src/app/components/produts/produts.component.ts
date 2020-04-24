import { Component, OnInit } from '@angular/core';
import { ProdutsService } from 'src/app/services/produts.service';
import { Producto } from 'src/app/interface/producto';
import { ProductoCart } from 'src/app/interface/producto-cart';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produts',
  templateUrl: './produts.component.html',
  styleUrls: ['./produts.component.css']
})
export class ProdutsComponent implements OnInit {

  public productos: Producto[];
  public modal: Producto;

  constructor(public producService: ProdutsService, private cartService: CartService) {
    this.productos = producService.getDataProducto();
  }

  ngOnInit() {
  }

  openModal(item: Producto) {
    this.modal = item;
  }

  agregarProducto(): void {
    const producto: ProductoCart = {
      ref: this.modal.ref,
      nombre: this.modal.nombre,
      precio: this.modal.precio,
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
