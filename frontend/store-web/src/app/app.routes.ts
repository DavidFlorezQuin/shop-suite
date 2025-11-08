import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductListComponent } from './features/products/pages/product-list/product-list';
import { ProductFormComponent } from './features/products/pages/product-form/product-form';
import { SaleListComponent } from './features/sales/pages/sale-list/sale-list';
import { SaleFormComponent } from './features/sales/pages/sale-form/sale-form';
import { authGuard } from './core/guards/auth.guards';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  // Productos (rutas protegidas)
  { path: 'products', component: ProductListComponent, canActivate: [authGuard] },
  { path: 'products/new', component: ProductFormComponent, canActivate: [authGuard] },
  { path: 'products/edit/:id', component: ProductFormComponent, canActivate: [authGuard] },

  // Ventas (rutas protegidas)
  { path: 'sales', component: SaleListComponent, canActivate: [authGuard] },
  { path: 'sales/new', component: SaleFormComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' }
];
