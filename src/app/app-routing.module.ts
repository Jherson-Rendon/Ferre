import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutsComponent } from './components/produts/produts.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ContactoComponent } from './components/contacto/contacto.component';

const routes: Routes = [
  { path: 'contacto', component: ContactoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'producto/:producto', component: DetallesComponent },
  {
    path: 'inicio',
    component: ProdutsComponent,
    data: { title: 'inicio List' }
  },
  { path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  { path: '**', component: ProdutsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
