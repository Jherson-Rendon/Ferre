import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { ProdutsComponent } from './components/produts/produts.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PaginacionComponent } from './components/paginacion/paginacion.component';

// Pipes
import { RoundPipe } from './pipes/round/round.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    ProdutsComponent,
    NosotrosComponent,
    ContactoComponent,
    DetallesComponent,
    SidebarComponent,
    PaginacionComponent,
    RoundPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
