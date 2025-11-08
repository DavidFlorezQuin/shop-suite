import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductListComponent } from './features/products/pages/product-list/product-list';
import { ProductFormComponent } from './features/products/pages/product-form/product-form';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'products/new', component: ProductFormComponent },
    { path: 'products/edit/:id', component: ProductFormComponent },
    { path: '**', redirectTo: 'login' }
  
];
