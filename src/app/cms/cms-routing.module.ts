import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Componentes
import { CmsComponent } from './cms.component';
import { ProductosComponent } from './components/productos/productos.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', component: CmsComponent, children:
    [
      { path: 'productos', component: ProductosComponent },
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'admin', component: AdminComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
