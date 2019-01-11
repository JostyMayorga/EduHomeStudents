// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
import { BackendService } from "./services/backend.service";

import * as app from 'application';
import { setStatusBarColors } from "./utils/status-bar-util";
import * as pushPlugin from "nativescript-push-notifications";


app.on(app.launchEvent, (args: app.ApplicationEventData) => {
  if (args.android) {
    console.log("Main.ts")
    pushPlugin.register({ senderID: '536581481117' }, function (token){
        //alert('Device registered successfully : ' + token);
        console.log('Device registered successfully : ' + token);
    }, function() {
      console.log("HOLA");
    });

    pushPlugin.onMessageReceived(function callback(data) {  
        console.log('Message received');
    });
    
  }
})

/*import firebase = require("nativescript-plugin-firebase");

firebase.init({
  //persist should be set to false as otherwise numbers aren't returned during livesync
  persist: true,
  storageBucket: 'gs://eduhome-abb88.appspot.com',
  onAuthStateChanged: (data: any) => {
    console.log(JSON.stringify(data))
    if (data.loggedIn) {
      BackendService.token = data.user.uid;
    }
    else {
      BackendService.token = "";
    }
  }
}).then(
  function (instance) {
    console.log("firebase.init done");
  },
  function (error) {
    console.log("firebase.init error: " + error);
  }
  );*/
setStatusBarColors();
platformNativeScriptDynamic().bootstrapModule(AppModule);

/*

import { BackendService } from "./services/backend.service";

import firebase = require("nativescript-plugin-firebase");

firebase.init({
  //persist should be set to false as otherwise numbers aren't returned during livesync
  persist: false,
  storageBucket: 'gs://giftler-f48c4.appspot.com',
  onAuthStateChanged: (data: any) => {
    console.log(JSON.stringify(data))
    if (data.loggedIn) {
      BackendService.token = data.user.uid;
    }
    else {
      BackendService.token = "";
    }
  }
}).then(
  function (instance) {
    console.log("firebase.init done");
  },
  function (error) {
    console.log("firebase.init error: " + error);
  }
  );
platformNativeScriptDynamic().bootstrapModule(AppModule);
*/