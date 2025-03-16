import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  user$;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.user$ = this.authService.getUser();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      try {
        await this.authService.login(formData.email, formData.password);
        this.errorMessage = ''; // Limpiar error si el login es exitoso
      } catch (error: any) {
        console.error("Error en login.component.ts:", error); // 🔹 Ver qué datos tiene el error
        
        // 🔹 Verificar si `error.code` está definido
        if (error?.code) {
          this.errorMessage = this.getErrorMessage(error.code);
        } else {
          this.errorMessage = "Error desconocido: " + JSON.stringify(error);
        }
      }
    }
  }
  

  logout() {
    this.authService.logout();
    this.errorMessage = "logout complete!"
  }

  private getErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/invalid-credential': 'Email or password incorrect!', // 🔹 Nuevo código de error
      'auth/invalid-email': 'El correo electrónico no es válido.',
      'auth/user-disabled': 'El usuario ha sido deshabilitado.',
      'auth/user-not-found': 'No se encontró el usuario.',
      'auth/wrong-password': 'Contraseña incorrecta.',
      'auth/missing-password': 'La contraseña es obligatoria.'
    };
    return errorMessages[errorCode] || 'Ocurrió un error inesperado.';
  }
}
