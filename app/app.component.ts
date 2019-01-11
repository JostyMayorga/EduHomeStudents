import { Component, OnInit } from "@angular/core";
import { isAndroid } from "platform";
import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";

//import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import { registerElement } from 'nativescript-angular';
registerElement('CardView', () => CardView);

import { BackendService } from "./services/backend.service";

//import firebase = require("nativescript-plugin-firebase");
const firebase = require("nativescript-plugin-firebase");



import { FormsModule } from "@angular/forms";
import { Message } from "nativescript-plugin-firebase";
import * as dialogs from "ui/dialogs";

import { getString, setString } from "tns-core-modules/application-settings";


//import { BackendService } from "./shared/backend.service";
@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
        //BackendService.setup();
        console.log("App component");
    }

    ngOnInit(): void {
        firebase.init({
         /* onMessageReceivedCallback: function(message) {

            console.dir(message);
            dialogs.alert({
                title: message.title,
                message: message.body,
                okButtonText: "ok"
            });
        },*/
          /*onMessageReceivedCallback: (message: Message) => {
            console.log(`Title: ${message.title}`);
            console.log(`Body: ${message.body}`);
            // if your server passed a custom property called 'foo', then do this:
            console.log(`Value of 'foo': ${message.data.foo}`);
          },*/

            //persist should be set to false as otherwise numbers aren't returned during livesync
            persist: true,
            storageBucket: 'gs://eduhome-abb88.appspot.com',
            onPushTokenReceivedCallback: function(token) {
              // temporarily save it to application settings until such time that 
              // the user logs in for the first time
              console.log("token: "+ token)
              //setString('device_token', token);
            },
            onMessageReceivedCallback: (message: Message) => {
              console.log(`Title: ${message.title}`);
              console.log(`Body: ${message.body}`);
              // if your server passed a custom property called 'foo', then do this:
              console.log(`Value of 'foo': ${message.data.foo}`);
              /*dialogs.alert({
                title: "Push message: " + (message.title !== undefined ? message.title : ""),
                message: JSON.stringify(message.body),
                okButtonText: "W00t!"
              });*/
            },
            onAuthStateChanged: (data: any) => {
              //console.log(JSON.stringify(data))
              if (data.loggedIn) {
                //BackendService.token = data.user.uid;
                if(BackendService.isProfesor()){
                  BackendService.tokenKeyProfesor = data.user.uid;
                }else if(BackendService.isRepresentante()){
                  BackendService.tokenKeyRepresentante = data.user.uid;
                }
              }
              else {
                BackendService.tokenKeyProfesor = "";
                BackendService.tokenKeyRepresentante = "";
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

          /*firebase.keepInSync(
            '/representantes/'+BackendService.token+'/cursos/', // which path in your Firebase needs to be kept in sync?
            true      // set to false to disable this feature again
          ).then(
            function () {
              console.log("firebase.keepInSync is ON for /users");
            },
            function (error) {
              console.log("firebase.keepInSync error: " + error);
            }
          );*/
        // Init your component properties here.
    }

    /*getIconSource(icon: string): string {
        const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";

        return iconPrefix + icon;
    }*/
}
