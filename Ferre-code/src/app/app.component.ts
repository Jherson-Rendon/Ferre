import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  modal = false;
  title = 'tienda';

  constructor() {}

  procesoModal(valor: boolean) {
    this.modal = valor;
  }
}
