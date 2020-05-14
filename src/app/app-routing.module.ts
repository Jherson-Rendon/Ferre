import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ProdutsComponent } from './components/produts/produts.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LayoutComponent } from './layout/layout.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children:
    [
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      { path: 'inicio', component: ProdutsComponent },
      { path: 'inicio/page/:page', component: ProdutsComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'producto/:id', component: DetallesComponent }
    ]
  },
  { path: 'cms', loadChildren: './cms/cms.module#CmsModule' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
