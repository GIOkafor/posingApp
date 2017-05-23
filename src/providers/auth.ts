import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import firebase from 'firebase';
import 'rxjs/add/operator/map';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: Http) {
    console.log('Hello Auth Provider');
  }

  loginUser(email: string, password: string): firebase.Promise<any>{
  	return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): firebase.Promise<any> {
  	return firebase.auth().createUserWithEmailAndPassword(email, password)
  	.then( newUser => {
  		firebase.database().ref('./userProfile').child(newUser.uid)
  		.set({ email: email });
  	});
  }

  resetPassword(email: string): firebase.Promise<void>{
  	return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<void>{
  	return firebase.auth().signOut();
  }
}
