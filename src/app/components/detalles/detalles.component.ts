import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProdutsService } from 'src/app/services/produts.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  public idProducto: number;
  public producto: {};

  constructor(private rutaActiva: ActivatedRoute, public producService: ProdutsService) {
    rutaActiva.params.subscribe(params => {
      this.idProducto = params.id;
      this.producto = producService.getDataProducto()[this.idProducto - 1];

      console.log(this.producto);
    });

  }

  ngOnInit() {
  }

}
