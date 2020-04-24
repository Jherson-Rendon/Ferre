import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductoCart } from 'src/app/interface/producto-cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public productos: ProductoCart[];
  public precioTotal = 0;

  @Output()
  public modal = new EventEmitter<boolean>();

  constructor(private cartService: CartService) {
    this.productos = this.cartService.getProductos();
  }

  ngOnInit() {
    console.log(this.productos);
    if (this.productos) {
      this.productos.forEach(producto => {
        this.precioTotal += producto.precio * producto.cantidad;
      });
    }

    ($('#shoppingCart') as any).modal('show');
    console.log('se abrio');

    $('#shoppingCart').on('hide.bs.modal', () => {
      console.log('se cerro el modal');
      this.modal.emit(false);
    });

    $(document).on('click', '.eliminar', function(event) {
      event.preventDefault();
      $(this).closest('tr').remove();
    });
  }

  eliminarItem(ref: number, precio: number, cantidad: number) {
    this.precioTotal -= precio * cantidad;
    this.cartService.borrarProducto(ref);
  }

  cambioCantidad(ref: number) {
    const cantidad = Number($('#cantidad' + ref).val());
    const response = this.cartService.actualizarCantidad(ref, cantidad);

    if (response) {
      this.productos = this.cartService.getProductos();
      this.precioTotal = 0;
      if (this.productos) {
        this.productos.forEach(producto => {
          this.precioTotal += producto.precio * producto.cantidad;
        });
      }
    }
  }

}
