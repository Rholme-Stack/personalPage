import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User:', userCredential.user);
    } catch (error: any) {
      console.error('Error:', error);
      throw error;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  getUser(): Observable<any> {
    return user(this.auth);
  }
}
