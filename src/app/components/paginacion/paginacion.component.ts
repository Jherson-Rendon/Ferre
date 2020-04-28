import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {

  @Input() public page: number;
  @Input() public totalPages: number;
  @Output() paginaEmitter: EventEmitter<number> =  new EventEmitter();

  public pages = new Array();

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  siguiente() {
    this.page++;
    this.pasarPagina();
  }

  anterior() {
    this.page--;
    this.pasarPagina();
  }

  pasarPagina(page?: number) {
    this.paginaEmitter.emit(page || this.page);
  }
}
