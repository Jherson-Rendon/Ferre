import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-produts',
  templateUrl: './produts.component.html',
  styleUrls: ['./produts.component.css']
})
export class ProdutsComponent implements OnInit {

  public productos = [
    { id: 1, name: 'Martillo', img: 'assets/img/productos/1.jpg', des: 'Para el baño', precio: '3.000', hover: false },
    { id: 2, name: 'Tubo', img: 'assets/img/productos/2.jpg', des: 'Este es otro', precio: '3.500', hover: false }
  ];

  public modal: { name: '', img: '', des: '', precio: '' };

  constructor() {
  }

  ngOnInit() {
  }

  openModal(item) {
    this.modal = item;
  }
}
