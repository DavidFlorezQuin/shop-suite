import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleListComponent } from './pages/sale-list/sale-list'
import { SaleFormComponent } from './pages/sale-form/sale-form'

const routes: Routes = [
  { path: '', component: SaleListComponent },
  { path: 'new', component: SaleFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
