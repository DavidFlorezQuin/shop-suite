import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductList } from './features/products/pages/product-list/product-list';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductList },
    { path: '**', redirectTo: 'login' }
];
