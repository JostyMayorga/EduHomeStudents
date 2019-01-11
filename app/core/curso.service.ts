import { Injectable } from "@angular/core";
import { Curso } from "../shared/curso.model";


@Injectable()
export class CursoService {

    private cursos = new Array<Curso>(
        {
            id: 1,
            nombre: "Lenguaje y Literatura",
            imagen: "http://www.smpilar.es/wp-content/uploads/2015/12/fondo-smp.jpg",
            cantidadTareas: 2,
            color: "#fc762b"
        },
        {
            id: 2,
            nombre: "Matemáticas",
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU1h_vSUSMaoXdjZVAyM03dqMQPUw735VXw4jGM8a_iWlz5TTf",
            cantidadTareas: 5,
            color: "#5bbcb7"
        },
        {
            id: 3,
            nombre: "Inglés Avanzado",
            imagen: "https://cdn.pixabay.com/photo/2015/09/03/05/52/green-background-920072_960_720.jpg",
            cantidadTareas: 1,
            color: "#243a3a"
        },
        {
            id: 4,
            nombre: "Emprendimiento",
            imagen: "https://image.freepik.com/foto-gratis/concepto-de-educacion-regreso-a-la-escuela-en-el-fondo-de-la-pizarra_43429-1.jpg",
            cantidadTareas: 0,
            color: "#aa7100"
        },
        {
            id: 5,
            nombre: "Estudios Sociales",
            imagen: "https://image.freepik.com/foto-gratis/concepto-de-educacion-regreso-a-la-escuela-en-el-fondo-de-la-pizarra_43429-1.jpg",
            cantidadTareas: 0,
            color: "#8f05e8"
        },
        {
            id: 6,
            nombre: "Ciencias Naturales",
            imagen: "https://image.freepik.com/foto-gratis/concepto-de-educacion-regreso-a-la-escuela-en-el-fondo-de-la-pizarra_43429-1.jpg",
            cantidadTareas: 1,
            color: "#f9ae06"
        },
        {
            id: 7,
            nombre: "Cultura Estética",
            imagen: "https://image.freepik.com/foto-gratis/concepto-de-educacion-regreso-a-la-escuela-en-el-fondo-de-la-pizarra_43429-1.jpg",
            cantidadTareas: 1,
            color: "#a757e5"
        },
        {
            id: 8,
            nombre: "Educación Física",
            imagen: "https://image.freepik.com/foto-gratis/concepto-de-educacion-regreso-a-la-escuela-en-el-fondo-de-la-pizarra_43429-1.jpg",
            cantidadTareas: 0,
            color: "#f7996b"
        }
    );

    getCursos(): Array<Curso> {
        return this.cursos;
    }

    getCurso(id: number): Curso {
        return this.cursos.filter((curso) => curso.id === id)[0];
    }
}
