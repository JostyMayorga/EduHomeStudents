import { NgModule } from "@angular/core";
//import { DataService } from "./data.service";
import { CursoService } from "./curso.service";
import { TareaService } from "~/core/tarea.service";

@NgModule({
    providers: [
        //DataService,
        CursoService,
        TareaService
    ]
})
export class CoreModule { }
