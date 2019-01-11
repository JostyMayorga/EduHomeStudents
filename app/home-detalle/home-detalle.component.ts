import { Component, OnInit,NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Curso }  from "../shared/curso.model";
import { Tarea }  from "../shared/tarea.model";
import { Observable } from "rxjs";
import { FirebaseService } from "../services/firebase.service";
import * as dialogs from "ui/dialogs";
const PhotoViewer = require("nativescript-photoviewer");
var photoViewer;

@Component({
    selector: "HomeDetalle",
    moduleId: module.id,
    templateUrl: "./home-detalle.component.html",
    styleUrls: ['./home-detalle.component.css']
})

export class HomeDetalleComponent implements OnInit{

    private sub: any;
    curso:Curso;
    id: string;
    name: string;
    description: string;
    imagepath: string;
    image: any;
    public listaTareas:Array<Tarea>;
    listaTareas_:Array<Tarea>;
    public genero:string;
    public cantidadTareas:number;
    public oculto:boolean;

    constructor(private route: ActivatedRoute, private router: RouterExtensions, private firebaseService:FirebaseService ) {
        this.curso = new Curso();
        this.listaTareas = [];
        this.listaTareas_= [];
        this.cantidadTareas = 0;
        this.oculto = true;
    }

    galleryLoaded(){
        console.log("gallery loaded...");
    }

    openGallery(id){
        let image1 = this.listaTareas[id-1].fotoUrl;
	    var myImages = [image1];

        if(!photoViewer)
            photoViewer = new PhotoViewer();
        photoViewer.paletteType = "LIGHT_MUTED"; // Android only
        photoViewer.showAlbum = false; // Android only (true = shows album first, false = shows fullscreen gallery directly)
        photoViewer.startIndex = 0; // start index for the fullscreen gallery
        photoViewer.showViewer(myImages);
    }

    ngOnInit():void {

        <any>this.firebaseService.datosRepresentante().then(
            data => {
                this.genero = data.value.genero;
            }
        );

        const id = +this.route.snapshot.params.id;        

        this.firebaseService.getCurso(id).then(data=>{

            this.curso = new Curso(data.value.id, data.value.nombre, data.value.imagen, data.value.color);

            data.value.tareasID.forEach((tarea) => {

                this.listaTareas.push(new Tarea(tarea.id,tarea.titulo, tarea.descripcion, tarea.fotoUrl, tarea.archivoPath, tarea.color, tarea.fechaEntrega, tarea.revisado))
            });
            this.actualizarTareas()
        });
        
    }
    actualizarTareas() {

        this.listaTareas_ = [];
        this.listaTareas_ = this.listaTareas.filter(tarea=> {
            return (!tarea.revisado && new Date(tarea.fechaEntrega)>=new Date())
        })
        this.cantidadTareas = this.listaTareas_.length;
        this.oculto = this.cantidadTareas >0 ? true : false;

    }
    regresar() {
        this.router.back();
    }

    listo(tarea) {

        dialogs.confirm({
            title: "Confirmación de tarea",
            message: "¿Estás seguro que esta tarea fue realizada?",
            okButtonText: "Sí",
            cancelButtonText: "Cancelar"
        }).then(result => {
            // result argument is boolean

            if(result){
                this.listaTareas[tarea-1].revisado = true;

                this.firebaseService.actualizarCurso(this.curso.id - 1, tarea-1, this.listaTareas[tarea-1]).then(

                    ()=>{this.actualizarTareas()}
                );
            }
        });
    }

}