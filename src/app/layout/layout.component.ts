import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  public modal= false;

  constructor() { }

  procesoModal(event:boolean){
    this.modal=event;
  }


  closeNav() {
    if ($('#mySidenav').innerWidth() >= 200) {
      document.getElementById('mySidenav').style.width = '0';
      document.getElementById('main').style.marginLeft = '0';
    }
  }

}
