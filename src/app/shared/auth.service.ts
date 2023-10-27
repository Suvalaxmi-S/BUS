import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(private fireauth: AngularFireAuth, private route: Router) {
    // Check for the presence of the token during initialization
    this.isAuthenticated = !!localStorage.getItem('token');
  }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        // Save the authentication token in local storage
        localStorage.setItem('token', 'your_auth_token');
        this.isAuthenticated = true; // Set to true when the user logs in
        this.route.navigate(['/buses']);
      },
      (err) => {
        alert('Login failed. Please check your credentials.');
      }
    );
  }

  signup(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('Registration successful');
        this.route.navigate(['/login']);
      },
      (err) => {
        alert('Registration failed');
        this.route.navigate(['/signup']);
      }
    );
  }

  getTokenValue(): boolean {
    // Retrieve the token value from localStorage or any other source
    return this.isAuthenticated;
  }

  logout() {
    // Remove the authentication token from local storage
    localStorage.removeItem('token');
    this.isAuthenticated = false; // Set to false when the user logs out

    this.fireauth.signOut().then(() => {
      console.log('User signed out successfully');
      this.route.navigate(['/login']);
    });
  }

  value: boolean = false;
  admin_login;

  sendAdmin(bool) {
    this.admin_login = bool;
  }
  getadmin() {
    return this.admin_login;
  }
}
