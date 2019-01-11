import { Component, OnInit,NgZone } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Curso } from "../shared/curso.model";
import { FirebaseService } from "../services/firebase.service";
import { Page } from "tns-core-modules/ui/page/page";
import { UserEduHome } from "../shared/user-eduhome";
import { BackendService } from "../services/backend.service";
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { getString, setString } from "tns-core-modules/application-settings";

@Component({
    selector: "PrimerCapitulo",
    moduleId: module.id,
    templateUrl: "./primercapitulo.component.html",
    styleUrls: ['./primercapitulo.component.css']
})
export class PrimerCapituloComponent implements OnInit {

    public image = "~/images/historia-01.jpg";
    public desc = "Primer texto"
    i: number=0;
    public isVisible: boolean = true;

    constructor(private routerExtensions: RouterExtensions, private firebaseService:FirebaseService, private route: ActivatedRoute) {

    }

    ngOnInit(): void {

    }

    avanzar(cant){
        this.i = this.i + cant;
        switch(this.i) { 
            case 1: { 
                this.desc = getString("nameStudent", this.desc) + " Segundo Texto"
               break; 
            } 
            case 2: { 
                this.desc = "Tercer Texto"
               break; 
            }
            case 3:{
                this.desc = "Cuarto Texto"
                break; 
            }
            case 4:{
                this.desc = "Quinto Texto"
                break; 
            }
            case 5:{
                this.desc = "Sexto Texto"
                break; 
            }
            case 6: { 
                this.desc = "Séptimo Texto"
               break; 
            }
            case 7: { 
                this.desc = "Octavo Texto"
               break; 
            }
            case 8: { 
                this.desc = "Noveno Texto"
               break; 
            }
            case 9: { 
                this.desc = "Démico Texto"
                this.image = "~/images/historia-02.jpg";
               break; 
            }
            default: {
                this.routerExtensions.navigate(["/main/historias"], { clearHistory: true });
            } 
         } 
        
    }

}
