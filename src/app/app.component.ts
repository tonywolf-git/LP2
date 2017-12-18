import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { Insomnia } from '@ionic-native/insomnia';

import { Toast } from '@ionic-native/toast';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  lastTimeBackPress = 0;
  timePeriodToExit  = 2000;

  logArray: any;

  constructor(public toasty: Toast, public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, noSleep: Insomnia) {
    platform.ready().then(() => {

      this.platform.pause.subscribe(() => {
        console.log('APP WILL CLOSE');
        /*this.logArray = [];
        localStorage.setItem('log', this.logArray);*/
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //platform.registerBackButtonAction(()=>this.myHandlerFunction());
      noSleep.keepAwake();
      statusBar.backgroundColorByHexString('#191919');
      //statusBar.styleDefault();

      splashScreen.hide();
    });
  }

  myHandlerFunction(){
    if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
      this.platform.exitApp(); //Exit from app
    } else {
      this.toasty.show(`I'm a toast`, '2500', 'bottom').subscribe(
        toast => {
          console.log(toast);
          this.lastTimeBackPress = new Date().getTime();
        }
      );
    }
  }
}