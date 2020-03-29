import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public rutas = [
    { name: 'Inicio', route: 'inicio'},
    { name: 'Nosotros', route: 'nosotros'},
    { name: 'Contacto', route: 'contacto'}
  ];
  constructor() { }

  ngOnInit() {
  }

  onToggleCollapse() {
    ($('.collapse') as any).toggle('slow');
  }
}
