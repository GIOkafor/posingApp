import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  zone: NgZone;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    //firebase initialization
    firebase.initializeApp({
      apiKey: "AIzaSyBf4BIO3N0ljcs4SIAJIxruzRdjYWJ8fPw",
      authDomain: "posingapp.firebaseapp.com",
      databaseURL: "https://posingapp.firebaseio.com",
      projectId: "posingapp",
      storageBucket: "posingapp.appspot.com",
      messageSenderId: "857962289964"
    });

    //initialize zone variable
    this.zone = new NgZone({});

    //create auth listener
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run(() => {
        if(!user){
          this.rootPage = 'login';
          unsubscribe();
        }else{
          this.rootPage = TabsPage;
          unsubscribe();
        }
      });
    });
  }
}
