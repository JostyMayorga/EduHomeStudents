import {Component} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { FirebaseService } from "../services/firebase.service";
import { getString, setString } from "tns-core-modules/application-settings";

@Component({
    selector: 'Historias',
    moduleId: module.id,
    templateUrl: "./historias.component.html",
    styleUrls: ['./historias.component.css']
})

export class HistoriasComponent {

    columns;
    public icoChapter1 = "~/images/chapter1.png";
    static icoChapter1 = "~/images/chapter1.png";
    public icoChapter2 = "~/images/chapter2.png";
    static icoChapter2 = "~/images/chapter2.png";
    public icoChapter3 = "~/images/chapter3.png";
    static icoChapter3 = "~/images/chapter3.png";
    public icoChapter4 = "~/images/chapter4.png";
    static icoChapter4 = "~/images/chapter4.png";
    public icoChapter5 = "~/images/chapter5.png";
    static icoChapter5 = "~/images/chapter5.png";
    public icoPlay = "~/images/play.png";
    static icoPlay = "~/images/play.png";
    public icoLock = "~/images/lock.png";
    static icoLock = "~/images/lock.png";

    get icoChapter1_() {
        return HistoriasComponent.icoChapter1;
    }
    get icoChapter2_() {
        return HistoriasComponent.icoChapter2;
    }
    get icoChapter3_() {
        return HistoriasComponent.icoChapter3;
    }
    get icoChapter4_() {
        return HistoriasComponent.icoChapter4;
    }
    get icoChapter5_() {
        return HistoriasComponent.icoChapter5;
    }
    get icoPlay_() {
        return HistoriasComponent.icoPlay;
    }
    get icoLock_() {
        return HistoriasComponent.icoLock;
    }

    static faltante: string;

    experiencia = getString("experienceStudent", this.experiencia);
    experience = Number(this.experiencia);
    //experience = 100;

    faltante = 0; 
    


    constructor(private router: RouterExtensions, private firebaseService:FirebaseService) {
    }

    public ngAfterViewInit() {
        //console.dir(this.listaNombres)
    }


    irCapitulo(numero) {


        this.router.navigate(["/main/primercapitulo"], { clearHistory: true });

    }


    calcularFaltante(){
        if (this.experience < 100){
            this.faltante = 100 - this.experience;
        } else if (this.experience < 400){
            this.faltante = 400 - this.experience;
        } else if (this.experience < 1000){
            this.faltante = 1000 - this.experience;
        } else if (this.experience < 2000){
            this.faltante = 2000 - this.experience;
        } else if (this.experience < 3500){
            this.faltante = 3500 - this.experience;
        }
        this.setProgressbarWidth(this.experience);
        
    }

    setProgressbarWidth(percent) {
        this.columns = percent + "*," + (this.faltante) + "*";
    }
    
    ngOnInit () : void {

        this.calcularFaltante();
        
    }

}