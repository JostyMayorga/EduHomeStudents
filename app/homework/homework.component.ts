import { Component, OnInit } from "@angular/core";

import { Tarea } from "../shared/tarea.model";
//import { TareaService } from "../core/tarea.service";

//import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: 'Homework',
    moduleId: module.id,
    templateUrl: './homework.component.html',
    styleUrls: ['./homework.component.css']
})

export class HomeworkComponent implements OnInit {

    tareas:Array<Tarea>;
    constructor() {
    }

    ngOnInit():void {
        //this.tareas = this.tareaService.getTareas();
        //console.log(JSON.stringify(this.tareas));
    }
//new Date(2018,10,10)


}