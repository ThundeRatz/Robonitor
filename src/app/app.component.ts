import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";

import { Plugins } from '@capacitor/core';
const { SplashScreen, StatusBar } = Plugins;

// import { SplashScreen } from "@ionic-native/splash-screen/ngx";
// import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  constructor(
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      SplashScreen.hide();
    });
  }
}
