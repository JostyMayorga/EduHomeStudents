import { Injectable } from "@angular/core";
import { Tarea } from "../shared/tarea.model";


@Injectable()
export class TareaService {

    private tareas;
    /*private tareas = new Array<Tarea>(
        {
            descripcion: "Cumplir los deberes 2 y 3 del libro ABC.Revision de la tabla de 4 al 10",
            fotoUrl: "http://www.smpilar.es/wp-content/uploads/2015/12/fondo-smp.jpg",
            archivoPath: "",
            color: "#fc762b",
            fechaEntrega: new Date(2018,9,9)

            //fechaEntrega: "#fc762b"
        },
        {
            descripcion: "Proxima clase leccion de lo revisado en clases hoy",
            fotoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU1h_vSUSMaoXdjZVAyM03dqMQPUw735VXw4jGM8a_iWlz5TTf",
            archivoPath: "",
            color: "#a757e5",
            fechaEntrega: new Date(2018,9,8)
        },
        {
           
            descripcion: "Repasar las palabras del libro ABC",
            fotoUrl: "https://cdn.pixabay.com/photo/2015/09/03/05/52/green-background-920072_960_720.jpg",
            fechaEntrega: new Date(2018,11,11),
            color: "#f7996b",
            archivoPath: "#243a3a"
        },
        {
            descripcion: "Practicar los ejercicios del capitulo 20 al 22 para el martes",
            fotoUrl: "https://image.freepik.com/foto-gratis/concepto-de-educacion-regreso-a-la-escuela-en-el-fondo-de-la-pizarra_43429-1.jpg",
            fechaEntrega: new Date(2018,10,10),
            archivoPath: "",
            color: "#aa7100"
        }
    );*/

    getTareas(): Array<Tarea> {
        return this.tareas;
    }
}
