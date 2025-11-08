import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../../../../core/services/product.services';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card'; // 👈 AÑADE ESTO

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule
  ],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.scss']
})
export class ProductFormComponent implements OnInit {
  product: Product = { id: 0, name: '', price: 0, stock: 0 };
  isEdit = false;

  constructor(
    private productService: ProductService,
    private snack: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id) {
      this.isEdit = true;
      this.productService.getById(id).subscribe({
        next: data => (this.product = data),
        error: () =>
          this.snack.open('Error al cargar producto', 'Cerrar', {
            duration: 2000
          })
      });
    }
  }

  save(form: NgForm): void {
    if (form.invalid) return;

    let request: Observable<any>;

    if (this.isEdit) {
      request = this.productService.update(this.product.id!, this.product);
    } else {
      request = this.productService.create(this.product);
    }

    request.subscribe({
      next: () => {
        this.snack.open('Guardado correctamente ✅', 'OK', {
          duration: 2000
        });
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        this.snack.open('Error al guardar', 'Cerrar', { duration: 2000 });
      }
    });
  }
}
