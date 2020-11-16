import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  constructor(private auth: AngularFireAuth) {
    this.user = auth.authState;
  }

  login() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(function (result) {
        sessionStorage.setItem("loggedIn", "1");
      });
  }

  loginFB() {
    this.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(function (result) {
        sessionStorage.setItem("loggedIn", "1");
      });
  }

  logout() {    
    this.auth.signOut()
      .then(function (result) {
        sessionStorage.removeItem("loggedIn");
      });
  }

  isLoggedIn(): boolean {
    var loggedIn = sessionStorage.getItem("loggedIn");
    return (loggedIn != null);
  }
}
