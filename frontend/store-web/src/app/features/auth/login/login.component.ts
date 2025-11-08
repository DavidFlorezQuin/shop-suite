import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    
  constructor(
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {}
  onSubmit(form: NgForm) {
    if (form.invalid) return;
  
    this.auth.login(form.value).subscribe({
      next: (response) => {
        if (response && response.accessToken) {
          localStorage.setItem('token', response.accessToken);
          console.log('Token guardado:', response.accessToken);
  
          this.snack.open('Bienvenido 👋', 'OK', { duration: 2000 });
  
          this.router.navigate(['/products']);
        } else {
          this.snack.open('Error al iniciar sesión: no se recibió token', 'Cerrar', { duration: 3000 });
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.snack.open('Credenciales incorrectas', 'Cerrar', { duration: 2000 });
      }
    });
  }
  


  
}
