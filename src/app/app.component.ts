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

  closeNav() {
    if ($('#mySidenav').innerWidth() >= 200) {
      document.getElementById('mySidenav').style.width = '0';
      document.getElementById('main').style.marginLeft = '0';
    }
  }
}
