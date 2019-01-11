import { Component, OnInit,NgZone, ViewContainerRef  } from "@angular/core";
import {Observable} from 'rxjs';
import { RouterExtensions } from "nativescript-angular/router";
import { Curso } from "../shared/curso.model";
import { FirebaseService } from "../services/firebase.service";
import { Page } from "tns-core-modules/ui/page/page";
import { UserEduHome } from "../shared/user-eduhome";
import { User } from "../shared/user.model";
import { BackendService } from "../services/backend.service";
import { PlatformLocation } from '@angular/common';
import { getString, setString } from "tns-core-modules/application-settings";
import { MainComponent } from "../main/main.component";
import { MyHttpGetService } from "../services/http-get.services";
import { SetupItemViewArgs } from "nativescript-angular/directives";



class Country {
    constructor(public name: string) { }
}



class Task {
    constructor(public id: string, public name: string, public description: string, public id_class_subject: string, public status: string) {
        
    }
}

let europianCountries = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
    "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy",
    "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia",
    "Slovenia", "Spain", "Sweden", "United Kingdom"];

    

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css'],
    providers: [MyHttpGetService]
})
export class HomeComponent implements OnInit {

    public icoTime = "~/images/time.png";
    static icoTime = "~/images/time.png";
    public icoMatematicas = "~/images/icoMatematicas.png";
    static icoLenguaje = "~/images/icoLenguaje.png";
    public icoLenguaje = "~/images/icoLenguaje.png";
    static icoMatematicas = "~/images/icoMatematicas.png";
    public icoNaturales = "~/images/icoNaturales.png";
    static icoNaturales = "~/images/icoNaturales.png";
    public icoSociales = "~/images/icoSociales.png";
    static icoSociales = "~/images/icoSociales.png";

    get icoTime_() {
        return HomeComponent.icoTime;
    }
    get icoMatematicas_() {
        return HomeComponent.icoMatematicas;
    }
    get icoLenguaje_() {
        return HomeComponent.icoLenguaje;
    }
    get icoNaturales_() {
        return HomeComponent.icoNaturales;
    }
    get icoSociales_() {
        return HomeComponent.icoSociales;
    }


    
    subject: string;

    

    
    countries: Array<Country>;

    tareas: Array<Task>;
    
    cursos: Array<Curso>;
    
    public static user:UserEduHome;
    public curso: Curso;
    public fotoPerfil:string;
    public visibility:string;
    public cantidadTareas:number = 0;
    public genero:string;
    public oculto:boolean = false;

    public user_:UserEduHome;

    constructor(private myService: MyHttpGetService,private router: RouterExtensions, private firebaseService:FirebaseService, private location : PlatformLocation) {
        
        

        HomeComponent.user = new UserEduHome("", "", "");
        this.user_ = new UserEduHome("", "", "");
        this.genero = getString("genero");

        if(this.genero) {
            this.oculto = true;
        }
        this.visibility = BackendService.esPrimeraVez()? "collapse" : "visible";
    }

    public onItemTap(args) {
        console.log("Item Tapped at cell index: " + args.index);
    }

    ocultarMensaje($event) {
        this.visibility = "collapse";
        console.log(BackendService.esPrimeraVez())
    }

    openModal(id, name, description){
        console.log(id + "name:" + name + " description: " + description)
    }

    irPerfil() {

        MainComponent.icoTaskTint = "#BBBBBB";
        MainComponent.icoStoryTint = "#BBBBBB";
        MainComponent.icoProfileTint = "#BBBBBB";

        MainComponent.icoTask = "~/images/task_g.png";
        MainComponent.icoStory = "~/images/story_g.png";
        MainComponent.icoProfile = "~/images/profile_b.png";

        this.router.navigate(["/main/perfil/1"], { clearHistory: true });

    }
    extractData() {


            console.log("extract tasks")
        this.myService.getTasks()
            .subscribe((result) => {
                this.onGetTasksSuccess(result);
            }, (error) => {
                console.log(error);
            });
            
    }

    onGetTasksSuccess(res) {
        console.log("on tasks success")
        this.tareas = []
        this.countries = [];
        

        for (let i = 0; i < res.length; i++) {
            console.log(res[i].homeworkdata.id_class_subject)
            switch(res[i].homeworkdata.id_class_subject) { 
                case "1": { 
                   this.subject = "matematicas"
                   break; 
                } 
                case "2": { 
                    this.subject = "naturales" 
                   break; 
                }
                case "3": { 
                    this.subject = "sociales" 
                   break; 
                }
                case "4": { 
                    this.subject = "lenguaje" 
                   break; 
                }
                case "5": { 
                    this.subject = "arte" 
                   break; 
                }   
                default: { 
                    this.subject = "fisica"
                   break; 
                } 
             } 
            this.tareas.push(new Task(res[i].homeworkdata.id, res[i].homeworkdata.name,res[i].homeworkdata.description,this.subject,res[i].status));
        }


        //res.forEach(function (value) {
        //    console.log(value)
        //    this.tareas.push(new Task(value.homeworkdata.id, value.homeworkdata.name, value.homeworkdata.description, value.homeworkdata.id_class_subject, value.status));
        //}); 

        console.log(this.tareas)
    }




    ngOnInit(): void {
        this.extractData();

        this.location.onPopState(() => {
            this.getData();
        });
        <any>this.firebaseService.datosRepresentante().then(
            data => {
                HomeComponent.user = new UserEduHome(data.value.nombres, data.value.apellidos, data.value.fotoPerfil)
                
                this.user_ = new UserEduHome(data.value.nombres, data.value.apellidos, data.value.fotoPerfil)
                
                this.genero = data.value.genero;
                setString("genero", this.genero);
            }
        );
        this.getData();
    }

    getData() {
        <any>this.firebaseService.getCursos().then(
            (data)=>{
                this.cursos = [];
                data.value.forEach((curso)=>{

                   let tareas = [];

                   curso.tareasID.forEach((tarea)=>{
                    if(!tarea.revisado && (new Date(tarea.fechaEntrega)>=new Date())){
                       tareas.push(0)
                    }
                   })
                    this.cursos.push(new Curso(curso.id, curso.nombre, curso.imagen, curso.color, tareas.length));
                })
            }
        );
    }
}
