import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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
  @Output()
  public modal = new EventEmitter<boolean>();

  ngOnInit() {
  }

  onToggleCollapse() {
    ($('#navbarSupportedContent') as any).toggle('slow');
  }

  openCart() {
    this.modal.emit(true);
  }
}
