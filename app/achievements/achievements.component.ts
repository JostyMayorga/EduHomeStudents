import {Component} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { FirebaseService } from "../services/firebase.service";

@Component({
    selector: 'Achievements',
    moduleId: module.id,
    templateUrl: "./achievements.component.html",
    styleUrls: ['./achievements.component.css']
})

export class AchievementsComponent {

    constructor(private router: RouterExtensions, private firebaseService:FirebaseService) {
    }

    public ngAfterViewInit() {
        //console.dir(this.listaNombres)
    }
    
    ngOnInit () {

    }

}