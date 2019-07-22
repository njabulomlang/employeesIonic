import { ViewPage } from './../pages/view/view';
import { Camera } from '@ionic-native/camera';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';


import { SQLite } from '@ionic-native/sqlite';
import { EditPage } from '../pages/edit/edit';
//import { EditPage } from '../pages/edit/edit';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditPage,
    ViewPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditPage,
    ViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    SQLite,
    Camera
  ]
})
export class AppModule {}
