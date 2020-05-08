import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  public rutas = [
    { ruta: 'productos', texto: 'Productos' },
    { ruta: 'nosotros', texto: 'Nosotros' },
    { ruta: 'admin', texto: 'Admin' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
