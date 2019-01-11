import {Component, ViewChild, ElementRef, OnInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Profesor} from "../shared/profesor.model";
import { Curso} from "../shared/curso.model";

import { FirebaseService } from "../services/firebase.service";
import { BackendService } from "../services/backend.service";
import * as app from "application"
import { ListView } from 'ui/list-view';
import { TextField } from 'ui/text-field';
import { ScrollView } from 'ui/scroll-view';
import {Page} from "ui/page";

declare var android:any;

class ChatId {

    constructor(public id?:string,
        public idChat?:string,
    public nombres?:string,
    public apellidos?:string,
    public color?:string,
    public materia?:string,
    public foto?:string, public idCurso?:string){}
}


@Component({
    selector: 'Boletin',
    moduleId: module.id,
    templateUrl: "./boletin.component.html",
    styleUrls: ['./boletin.component.css']
})

export class BoletinComponent implements OnInit {

    curso: Curso;
    profesor:Profesor;
    color:string;
    message:string;

    public idCurso:string;
    public listaNombres:ChatId[];


    constructor(private route: ActivatedRoute,private router: RouterExtensions, private firebaseService:FirebaseService, private page:Page) {
        this.curso = new Curso();
        this.listaNombres = [];
    }

    ngOnInit():void {

        //this.idCurso = this.route.snapshot.params.id;
        //console.log("ID del chat: "+this.idCurso);

        const id = +this.route.snapshot.params.id;      
        console.log(id)

        this.firebaseService.getCursoProfesor(id).then(data=>{

            this.curso = new Curso(data.value.id, data.value.nombre, data.value.imagen, data.value.color);

        });

        this.firebaseService.getChatInfoRepresentantes(id).then(data=>{

            console.log(data)
            data.value.forEach(element => {
                //console.log(element)

                console.log(element.idCurso)
                this.listaNombres.push(new ChatId(element.id, element.idChat, element.nombres, element.apellidos, element.color, element.materia, element.foto, element.idCurso))
            });
            //this.lista.push()
        })
        
    }
    regresar() {
        this.router.back();
    }  

}