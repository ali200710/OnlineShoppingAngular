import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../core/auth-services/auth-guard.service';
import { ProductCreateUpdateComponent } from './product/product-create-update/product-create-update.component';
import { ProductListComponent } from './product/product-list/product-list.component';

const routes: Routes = [
  { path: 'product', component: ProductListComponent, canActivate: [AuthGuardService] },
  { path: 'product/add', component: ProductCreateUpdateComponent, canActivate: [AuthGuardService], data: { routedRoles: ['admin'] } },
  { path: 'product/:id', component: ProductCreateUpdateComponent, canActivate: [AuthGuardService], data: { routedRoles: ['admin'] } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductOrderRoutingModule { }
