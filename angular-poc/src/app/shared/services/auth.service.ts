import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  isLogged: boolean;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
    this.isLogged = false;
    this.user.subscribe(user => {
      this.isLogged = user != null;
    });
  }

  loginUserPassword(email: string, password: string): void {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
    .then(x => {
      console.log('Logged');
      console.log(x);
    })
    .catch(err => {
      console.log('Login error: ' + err.message);
      console.log(err);
    });
  }

  loginGoogle(): void {
    firebase.auth().languageCode = 'pt';
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({
      login_hint: 'usuario@example.com'
    });
    this.login(provider);
  }

  loginFacebook(): void {
    firebase.auth().languageCode = 'pt';
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({
      login_hint: 'usuario@example.com'
    });
    this.login(provider);
  }

  login(provider: firebase.auth.AuthProvider): void {
    if (!this.isLogged) {
      from(this.firebaseAuth.auth.signInWithPopup(provider)).subscribe(
        x => {
          console.log(x.user);
        },
        error => {
          console.log(error.code);
        }
      );
    }
  }

  logout(): void {
    if (this.isLogged) {
      this.firebaseAuth.auth.signOut().then(() => {
        console.log('Sign-out successful');
      })
      .catch((err) => {
        console.log('An error happend: ' + err);
      });
    }
  }
}
