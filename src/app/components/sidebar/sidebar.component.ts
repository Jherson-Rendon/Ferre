import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public categorias = [
    { name: 'Todas', categorie: 'all', active: true },
    { name: 'Pinturas, esmaltes y barnices', categorie: 'paint', active: false },
    { name: 'Tuberías y sus accesorios', categorie: 'pipes', active: false },
    { name: 'Elementos de unión', categorie: 'union', active: false }
  ];

  constructor() { }

  ngOnInit() {
  }

  openAcordion() {
    const acc = document.getElementsByClassName('accordion')[0];
    acc.classList.toggle('active');

    const panel = acc.nextElementSibling;
    if ((panel as HTMLElement).style.display === 'block') {
      (panel as HTMLElement).style.display = 'none';
    } else {
      (panel as HTMLElement).style.display = 'block';
    }
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }

  setCategoria(index: number): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.categorias.length; i++) {
      this.categorias[i].active = false;
    }
    this.categorias[index].active = true;
  }
}
