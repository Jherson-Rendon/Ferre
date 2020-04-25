import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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
}
