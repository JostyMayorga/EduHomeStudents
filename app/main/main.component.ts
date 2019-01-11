import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from "@angular/core";

//import * as localStorage from 'nativescript-localstorage';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

//import { registerElement } from 'nativescript-angular';
//import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData, Notification } from 'nativescript-bottombar';
//import { Page } from "tns-core-modules/ui/page/page";
import { Page } from "tns-core-modules/ui/page";
//import { Page } from "ui/page";

import {Observable} from 'rxjs';
import { FirebaseService } from "../services/firebase.service";
import { MyHttpGetService } from "../services/http-get.services";
import { getString, setString } from "tns-core-modules/application-settings";
import * as application from "application";
import * as platform from "platform";
import { UserEduHome } from "../shared/user-eduhome";

import * as pushPlugin from "nativescript-push-notifications";
//registerElement('BottomBar', () => BottomBar);
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";


@Component({
    selector: "app-main",
    moduleId: module.id,
    templateUrl: "./main.component.html",
    styleUrls: ['./main.component.css'],
    providers: [MyHttpGetService]
})
export class MainComponent implements OnInit {

    public icoAvatar = "~/images/kid-avatar2.png";
    static icoAvatar = "~/images/kid-avatar2.png";

    columns;
    columnsExp;

    get icoAvatar_() {
        return MainComponent.icoAvatar;
    }



    subject: string;
    public id: string;
    public email: string;
    public name: string;
    public birthdate: string;
    public experience: string;
    public health: string;
    //message = "You have successfully authenticated. This is where you build your core application functionality.";

    /*
    public hidden: boolean;
    public titleState: TITLE_STATE;
    public _bar: BottomBar;
    public inactiveColor: string;
    public accentColor: string;
    public uncoloredBackgroundColor :string;
    //@ViewChild("dockDisplay") dockDisplay: ElementRef;
*/

    public icoTask = "~/images/task_g.png";
    public icoStory = "~/images/story_g.png";
    public icoProfile = "~/images/profile_b.png";


    static icoTask = "~/images/task_g.png";
    static icoStory = "~/images/story_g.png";
    static icoProfile = "~/images/profile_b.png";

    static icoProfileTint = "white";
    static icoStoryTint ="#BBBBBB";
    static icoTaskTint = "#BBBBBB";
    
    private feedback: Feedback;
    //public items: Array<BottomBarItem>;

    get icoTask_() {
        return MainComponent.icoTask;
    }
    get icoStory_() {
        return MainComponent.icoStory;
    }
    get icoProfile_() {
        return MainComponent.icoProfile;
    }
    get icoProfileTint_() {
        return MainComponent.icoProfileTint;
    }
    get icoStoryTint_() {
        return MainComponent.icoStoryTint;
    }
    get icoTaskTint_() {
        return MainComponent.icoTaskTint;
    }
      
    constructor(private myService: MyHttpGetService,private routerExtensions:RouterExtensions, private firebaseService:FirebaseService) {
        this.feedback = new Feedback();
    }
    irHome() {
        
        console.log("irHome")
        MainComponent.icoTaskTint = "white";
        MainComponent.icoStoryTint = "#BBBBBB";
        MainComponent.icoProfileTint = "#BBBBBB";
        MainComponent.icoTask = "~/images/task_b.png";
        MainComponent.icoStory = "~/images/story_g.png";
        MainComponent.icoProfile = "~/images/profile_g.png";

        this.routerExtensions.navigate(["/main/home"], { clearHistory: true });
    }

    irHistorias() {
        MainComponent.icoTaskTint = "#BBBBBB";
        MainComponent.icoStoryTint = "white";
        MainComponent.icoProfileTint = "#BBBBBB";
        MainComponent.icoTask = "~/images/task_g.png";
        MainComponent.icoStory = "~/images/story_b.png";
        MainComponent.icoProfile = "~/images/profile_g.png";

        console.log("h")
        this.routerExtensions.navigate(["/main/historias"], { clearHistory: true });
    }

    irPerfil() {
          
        MainComponent.icoTaskTint = "#BBBBBB";
        MainComponent.icoStoryTint = "#BBBBBB";
        MainComponent.icoProfileTint = "white";

        MainComponent.icoTask = "~/images/task_g.png";
        MainComponent.icoStory = "~/images/story_g.png";
        MainComponent.icoProfile = "~/images/profile_b.png";

        this.routerExtensions.navigate(["/main/perfil/1"], { clearHistory: true });
    }
    public ngAfterViewInit() {
    }
    ngOnInit(): void {

        this.extractData();

        console.log("ngOnInit");
        this.irHome();
        this.firebaseService.suscribirseTareas();
        this.firebaseService.suscribirseMensajesRepresentante();
        this.firebaseService.getMessage();
    }  

    extractData() {
        console.log("extract data")
        this.myService.getData()
            .subscribe((result) => {
                this.onGetDataSuccess(result);
            }, (error) => {
                console.log(error);
            });
            
    }

    onGetDataSuccess(res) {
        try {
            this.setProgressbarWidth(res.health);
            this.setProgressbarWidth2(res.experience);
        } catch (error) {
            
        }
        
        this.id = res.id;
        setString("idStudent", this.id);
        this.name = res.name;
        setString("nameStudent", this.name);
        this.email = res.email;
        setString("emailStudent", this.email);
        this.birthdate = res.birthdate;
        setString("birthdateStudent", this.birthdate);
        this.experience = res.experience;
        setString("experienceStudent", this.experience);
        this.health = res.health;
        setString("healthStudent", this.health);
        
    }

    setProgressbarWidth(percent) {
        this.columns = percent + "*," + (320 - percent) + "*";
    }
    setProgressbarWidth2(percent) {
        this.columnsExp = percent + "*," + (3500 - percent) + "*";
    }
     
}
