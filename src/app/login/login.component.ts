import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  user$;
  errorMessage: string = '';

  constructor(private authService: AuthService) {
    this.user$ = this.authService.getUser();
  }

  /*
  register() {
    this.authService.register(this.email, this.password)
      .then(() => this.errorMessage = '')
      .catch(error => this.errorMessage = error.message);
  }*/

      async login() {
        try {
          await this.authService.login(this.email, this.password);
          this.errorMessage = '';
        } catch (error: any) {
          this.errorMessage = error.message;
        }
      }
      

  logout() {
    this.authService.logout();
  }
}
  