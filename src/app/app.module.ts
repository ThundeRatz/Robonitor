import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StrategiesPage } from '../pages/strategies/strategies';
import { JoystickPage } from '../pages/joystick/joystick';
import { MonitracerPage } from '../pages/monitracer/monitracer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    JoystickPage,
    StrategiesPage,
    MonitracerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    JoystickPage,
    StrategiesPage,
    MonitracerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
