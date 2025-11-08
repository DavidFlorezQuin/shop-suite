import { Component, OnInit } from '@angular/core';
import { Sale, SaleService } from '../../../../core/services/sale.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule
  ],
  styleUrls: ['./sale-list.scss']
})
export class SaleListComponent implements OnInit {
  sales: Sale[] = [];

  constructor(
    private saleService: SaleService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSales();
  }

  loadSales() {
    this.saleService.getAll().subscribe({
      next: (data) => (this.sales = data),
      error: () => this.snack.open('Error al cargar ventas', 'Cerrar', { duration: 2000 })
    });
  }

  goToCreate() {
    this.router.navigate(['/sales/new']);
  }
}
