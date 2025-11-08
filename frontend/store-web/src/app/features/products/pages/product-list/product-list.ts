import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product, ProductService } from '../../../../core/services/product.services';
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon'; // 👈 Para <mat-icon>
import { MatDividerModule } from '@angular/material/divider'; // 👈 Para <mat-divider>

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatSnackBarModule, MatCardModule, MatIconModule, MatDividerModule ],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'price', 'stock', 'actions'];
  products: Product[] = [];

  constructor(private productService: ProductService, private snack: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: data => (this.products = data),
      error: () => this.snack.open('Error al cargar productos', 'Cerrar', { duration: 2000 })
    });
  }

  deleteProduct(id: number) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.snack.open('Producto eliminado', 'OK', { duration: 2000 });
          this.loadProducts();
        },
        error: () => this.snack.open('Error al eliminar', 'Cerrar', { duration: 2000 })
      });
    }
  }

  goToCreate() {
    this.router.navigate(['/products/new']);
  }

  goToEdit(id: number) {
    this.router.navigate(['/products/edit', id]);
  }
}
