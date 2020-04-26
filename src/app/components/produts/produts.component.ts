import { Component, OnInit } from '@angular/core';
import { ProdutsService } from 'src/app/services/produts.service';
import { Producto } from 'src/app/interface/producto';
import { ProductoCart } from 'src/app/interface/producto-cart';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
import { FiltrosService } from '../../services/filtros.service';

@Component({
  selector: 'app-produts',
  templateUrl: './produts.component.html',
  styleUrls: ['./produts.component.css']
})
export class ProdutsComponent implements OnInit {

  public productos: Producto[];
  public modal: Producto;

  constructor(private filterService: FiltrosService, public producService: ProdutsService, private cartService: CartService) {
    this.productos = this.producService.getDataProducto();
  }

  ngOnInit() {
    $('#exampleModal').on('hide.bs.modal', () => {
      $('#cantidad').val('1');
    });

    // Funcionalidad de buscar
    $('#buscar').keyup( (e) => {
      const busqueda = (e.target as HTMLInputElement).value;
      const resbusqueda = this.filterService.buscarProducto(busqueda);

      if (resbusqueda.length > 0) {
        this.productos = resbusqueda;
      }
    });

    // Filtrado por categoria
    $('.filter-categorie').click( (e) => {
      const categoria = e.target.dataset.categoria;
      this.productos = this.filterService.filtrarProductosByCategoria(categoria);
    });

    // Filtrado por precio
    $('#filter-price').click( () => {
      this.productos = this.filterService.filtrarProductosByPrecio(Number($('#precioMin').val()), Number($('#preioMax').val()));
    });

    // Ordenar
    $('#ordenarPor').change( (e) => {
      switch ((e.target as HTMLSelectElement).value) {
        case 'menor':
          this.productos = this.filterService.ordenarProductosByPrecioMenor();
          break;
        case 'mayor':
          this.productos = this.filterService.ordenarProductosByPrecioMayor();
          break;
        case 'a-z':
          this.productos = this.filterService.ordenarProductosByAZ();
          break;
        case 'z-a':
          this.productos = this.filterService.ordenarProductosByZA();
          break;
      }
    });
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

  openNav() {
    document.getElementById('mySidenav').style.width = '300px';
    document.getElementById('main').style.marginLeft = '300px';
  }
}
