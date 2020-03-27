import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutsService } from 'src/app/services/produts.service';

export interface Producto { nombre: string; img: string; minDes: string; fullDes: string;
                            precioAnt: number; precio: number; categoria: number[]; hover: boolean; }

@Component({
  selector: 'app-produts',
  templateUrl: './produts.component.html',
  styleUrls: ['./produts.component.css']
})
export class ProdutsComponent implements OnInit {

  public productos: {};

  public modal: Producto;
  public idPro: number;


  constructor(public producService: ProdutsService) {
    this.productos = producService.getDataProducto();
  }

  ngOnInit() {
  }

  openModal(item: Producto, id: number) {
    this.modal = item;
    this.idPro = id;
  }
}
