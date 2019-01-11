import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { FirebaseService } from "../services/firebase.service";
@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    constructor(private routerExtensions: RouterExtensions, private firebaseService:FirebaseService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }
    logout(){
        console.log(`Browse component salir`);

        this.firebaseService.logout();
        this.routerExtensions.navigate(['/login'], { clearHistory: true });

    }
}
