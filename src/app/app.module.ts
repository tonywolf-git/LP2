import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { File } from '@ionic-native/file';

import { FileChooser } from '@ionic-native/file-chooser';

import { SettingsPageModule } from '../pages/modals/settings/settings.module';
import { SoundPageModule } from '../pages/sound/sound.module';

import { Insomnia } from '@ionic-native/insomnia';

import { Toast } from '@ionic-native/toast';

import { NativeAudio } from '@ionic-native/native-audio';

import { HeaderColor } from '@ionic-native/header-color';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    SettingsPageModule,
    SoundPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileChooser,
    Insomnia,
    Toast,
    NativeAudio,
    HeaderColor,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
