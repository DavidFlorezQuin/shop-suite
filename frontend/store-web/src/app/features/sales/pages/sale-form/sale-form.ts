import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../../../core/services/product.services';
import { SaleService, Sale } from '../../../../core/services/sale.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  styleUrls: ['./sale-form.scss']
})
export class SaleFormComponent implements OnInit {
  products: Product[] = [];
  selectedItems: { productId: number; quantity: number; subtotal: number }[] = [];

  constructor(
    private productService: ProductService,
    private saleService: SaleService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => (this.products = data),
      error: () => this.snack.open('Error al cargar productos', 'Cerrar', { duration: 2000 })
    });
  }

  addItem(productId: number, quantity: number) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const subtotal = product.price * quantity;
    this.selectedItems.push({ productId, quantity, subtotal });
  }

  createSale() {
    const sale: Sale = {
      items: this.selectedItems
    };

    this.saleService.create(sale).subscribe({
      next: () => {
        this.snack.open('Venta registrada correctamente ✅', 'OK', { duration: 2000 });
        this.router.navigate(['/sales']);
      },
      error: () => {
        this.snack.open('Error al registrar venta ❌', 'Cerrar', { duration: 2000 });
      }
    });
  }
}
