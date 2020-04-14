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

    $(window).bind('storage', (e: any) => {
        console.log('cambio: ' + e.originalEvent.key, e.originalEvent.newValue);
    });
  }
}
