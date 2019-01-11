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


import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";
@Component({
    selector: "Perfil",
    moduleId: module.id,
    templateUrl: "./perfil.component.html",
    styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

    public icoAvatar = "~/images/kid-avatar2.png";
    static icoAvatar = "~/images/kid-avatar2.png";


    get icoAvatar_() {
        return PerfilComponent.icoAvatar;
    }

    static id: string;
    static email: string;
    static nomb: string;
    static birthdate: string;
    static experience: string;
    static health: string;

    id = getString("idStudent", this.id);;
    nomb = getString("nameStudent", this.nomb);;
    email = getString("emailStudent", this.email);;
    birthdate = getString("birthdateStudent", this.birthdate);;
    experience = getString("experienceStudent", this.experience);;
    health = getString("healthStudent", this.health);;




    cursos: Array<Curso>;
    public user:UserEduHome;
    public curso: Curso;
    public visibility:string;
    public cantidadTareas:number = 0;
    public genero:string;

    public tipo:any;

    constructor(private routerExtensions: RouterExtensions, private firebaseService:FirebaseService, private route: ActivatedRoute) {
        this.user = new UserEduHome("", "", "");
        this.visibility = "visible";
        this.genero = "";
    }

    logout() {

        BackendService.personaje = "";
        setString("genero", "");
        this.firebaseService.logout();
        this.routerExtensions.navigate(["login"] , { clearHistory: true });
    }

    ngOnInit(): void {

        this.tipo = this.route.snapshot.params.tipo;
        console.log(this.tipo);
        /*if(isAndroid){
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                data.cancel = true;
                this.regresar();
            });
        }*/
       
        if(this.tipo == 1) {
            <any>this.firebaseService.datosRepresentante().then(
                data => {
                    this.user = new UserEduHome(data.value.nombres, data.value.apellidos, data.value.fotoPerfil)
                    //this.genero = data.value.genero;
                }
            );
        } else if(this.tipo == 2) {
            <any>this.firebaseService.datosProfesor().then(
                data => {
    
                    this.user = new UserEduHome(data.value.nombres, data.value.apellidos, data.value.fotoPerfil);
                }
            );
        }
    }

    regresar() {
        //this.router.backToPreviousPage();
        this.routerExtensions.back();
    }

    irInfo() {
        
        console.log("irInfo")

        this.routerExtensions.navigate(["/main/perfil/1/info"], { clearHistory: true });
    }

    irAchievements() {
        
        console.log("irAchievements")

        this.routerExtensions.navigate(["/main/perfil/1/achievements"], { clearHistory: true });
    }
}
