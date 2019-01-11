import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
//import { Router } from "@angular/router";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
//import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
//import { Page } from "ui/page";

//import {Observable} from 'rxjs';
import { User } from "../shared/user.model";
//import { UserService } from "../shared/user.service";
import { getString, setString } from "tns-core-modules/application-settings";
//import * as localStorage from 'nativescript-localstorage';
import {FirebaseService} from "../services/firebase.service";
import { BackendService } from "../services/backend.service";
import * as dialogs from "ui/dialogs";

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public email:string
    user: User;
    processing = false;
    //isLoggingIn = true;
    ngOnInit(): void {

        this.user = new User();
       

        //this.user.email = "prueba@eduhome.com";
        /*this.user.password = "prueba123";
        this.user.email = "kevn.santacruz@gmail.com";

        this.user.email = "profe@eduhome.com";
        this.user.password = "prueba";
*/
        //this.user.email = "demo@eduhome.com";
        //this.user.password = "eduhom3";

        //this.user.email = "carlos@eduhome.club"
        //this.user.password = "carlos12"

        this.page.actionBarHidden = true;

    }
    //@ViewChild("profesor") profesorCheckBox: ElementRef;
    
    @ViewChild("password") password: ElementRef;
    //@ViewChild("confirmPassword") confirmPassword: ElementRef;
   
    //constructor(private page: Page, private userService: UserService, private router: Router) {
    constructor(private page: Page, private firebaseService: FirebaseService,
        private routerExtensions: RouterExtensions) {
        //this.page.actionBarHidden = true; 
    }
    submit() {
        //console.log("SUBMIT")
        this.processing = true;

            this.login();

        //this.login();     
    }
    
    login() {
        this.firebaseService.login(this.user)
            .then(() => {
                this.processing = false;
                //if(BackendService.isProfesor() || BackendService.isRepresentante())
                    
                    this.email = this.user.email;
                    setString("email", this.email);
                    console.log(getString("email"))
                    this.routerExtensions.navigate(["/main"] , { clearHistory: true });
            }, () => {
                dialogs.alert({
                    title: "EduHome",
                    message: "No hemos encontrado tu cuenta, verifique los datos.",
                    okButtonText: "Aceptar"
                }).then(() => {
                    console.log("Dialog closed!");
                });
                //alert("Verifica tu conexión a internet.");
            })
            .catch(() => {
                this.processing = false;
                //this.routerExtensions.navigate(["login"] , { clearHistory: true });
                //alert("No hemos encontrado tu cuenta.");
                dialogs.alert({
                    title: "EduHome",
                    message: "No hemos encontrado tu cuenta, verifique los datos.",
                    okButtonText: "Aceptar"
                }).then(() => {
                    console.log("Dialog closed!");
                });
        });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }
}

