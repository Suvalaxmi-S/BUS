import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  value:boolean=false;
  admin_login;
  constructor(private fireauth: AngularFireAuth, private route: Router) {}

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.value=true;
        this.route.navigate(['/buses']);
      },
      (err) => {
        alert('something went wrong');
        this.route.navigate(['/login']);
      }
    );
  }

  signup(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('registration successful');
        this.route.navigate(['/login']);
      },
      (err) => {
        alert('not registered');
        this.route.navigate(['/signup']);
      }
    );
  }
  getTokenValue(): boolean {
    // Retrieve the token value from localStorage or any other source
    
    return this.value;
  }
  send_admin(bool)
  {
   this.admin_login=bool;
  }
  getadmin()
  {
    return this.admin_login;
  }
}
