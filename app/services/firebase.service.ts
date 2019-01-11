import {Injectable, NgZone} from "@angular/core";
import {User} from "../shared/user.model";
import {Curso} from "../shared/curso.model";
import { BackendService } from "./backend.service";
import { UserEduHome } from "../shared/user-eduhome";

//import firebase = require("nativescript-plugin-firebase");
const firebase = require("nativescript-plugin-firebase");
import {Observable} from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { share } from 'rxjs/operators';
import { QueryOrderByType } from "nativescript-plugin-firebase";
import * as dialogs from "ui/dialogs";
import {  UtilsService } from "../utils/util.service";
import { NewTarea } from "../shared/tarea.new.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";

export class Yowl {
  constructor
    (
      public id: string,
      public name: string,
      public username: string,
      public text: string,
      public date: string,
      public UID: string 
    )
  {}   
}

@Injectable()
export class FirebaseService {

  items: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  
  private _allItems: Array<any> = [];

  chats: BehaviorSubject<Array<Yowl>> = new BehaviorSubject([]);
private _allChats: Array<Yowl> = [];

yowls: BehaviorSubject<Array<Yowl>> = new BehaviorSubject([]);
private _allYowls: Array<Yowl> = [];

private serverUrl = "https://fcm.googleapis.com/fcm/send";
private feedback: Feedback;

  private user:UserEduHome;

  public cantidad:Observable<any>;
  constructor(private ngZone: NgZone, private utils: UtilsService, private http: HttpClient
    ){
      this.feedback = new Feedback();
    }
    
    suscribirseTareas() {
      firebase.subscribeToTopic("tareas");
    }

    suscribirseMensajesRepresentante () {
      console.log("Suscribe Representante")
      firebase.subscribeToTopic(BackendService.tokenKeyRepresentante);
      //firebase.subscribeToTopic("mensajes/"+BackendService.tokenKeyRepresentante+"");
    }
    suscribirseMensajesProfesor () {
      console.log("Suscribe Profesor")
      firebase.subscribeToTopic(BackendService.tokenKeyProfesor);
      //firebase.subscribeToTopic("mensajes/"+BackendService.tokenKeyRepresentante+"")
    }

    notificarMensaje(emisor:string, mensaje:String, id) {

      //let idTest = BackendService.isProfesor()? BackendService.tokenKeyProfesor : BackendService.tokenKeyRepresentante;
      //console.log("idTest: "+idTest)

      let headers = this.createRequestHeader();
      let data = {
        "notification": {
          "title": emisor,
          "text" : mensaje,
          "sound" : "default",
        },
        "data" : {
          "titulo" : emisor,
          "duration": 2000,
          "descripcion": mensaje,
          "icon": "chat_b",
          "color": "#17375E"
        },
        "priority": "High",
        "to" : "/topics/"+id
      }
      return this.http.post(this.serverUrl, data , { headers });
    }

    notificarTarea(tarea:NewTarea) {
      let headers = this.createRequestHeader();
      let data = {
        "notification": {
          "title": tarea.titulo,
          "text" : tarea.descripcion,
          "sound" : "default",
        },
        "data" : {
          "color" : tarea.color,
          "titulo": tarea.titulo,
          "descripcion": tarea.descripcion,
          "duration": 5000,
          "icon": "libro_b"
        },
        "priority": "High",
        "to" : "/topics/tareas"
      }
      return this.http.post(this.serverUrl, data , {headers});
      //return this.http.delete(this.serverUrl, { headers: headers });
      /*
      curl -X POST --header "Authorization: key=AAAAfO6_op0:APA91bEYbCF_6qFpCPUyEwZlFKQxR0eKqGckldxmsUzfCclH_JmKpwNAguHo2HyqRAPix7ogOxn_KasYxkKyOLdslXkNNDlKkmBrnoDn_Gc6A_tkqJLpTgQLqDHx0x__YfdiTRVakwL_CWUd7gef9dAzJeS-Z-Cwzg" --Header "Content-Type: application/json" https://fcm.googleapis.com/fcm/send -d "{\"notification\":{\"title\": \"Tarea recibida\", \"text\": \"Haz recibido una tarea\", \"badge\": \"0\", \"sound\": \"default\"}, \"data\":{\"foo\":\"bar\"}, \"priority\": \"High\", \"to\": \"/topics/tareas\"}"
      */
    }
    private createRequestHeader() {
      // set headers here e.g.
      let headers = new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": "key=AAAAfO6_op0:APA91bEYbCF_6qFpCPUyEwZlFKQxR0eKqGckldxmsUzfCclH_JmKpwNAguHo2HyqRAPix7ogOxn_KasYxkKyOLdslXkNNDlKkmBrnoDn_Gc6A_tkqJLpTgQLqDHx0x__YfdiTRVakwL_CWUd7gef9dAzJeS-Z-Cwzg"
       });

      return headers;
  }

    getMessage():Promise<any>{

      return firebase.addOnMessageReceivedCallback((data)=>{
        console.log(JSON.stringify(data));
        
        if(data.data.icon=="book"){
        } 
        this.feedback.show({
          title: data.data.titulo,
          titleColor: new Color("#FFFFFF"),
          //position: FeedbackPosition.Bottom, // iOS only
          type: FeedbackType.Custom, // this is the default type, by the way
          message: data.data.descripcion,
          messageColor: new Color("#FFFFFF"),
          duration: +data.data.duration,
          backgroundColor: new Color(data.data.color),
          icon: "customicon",
          //icon: data.data.icon, // in App_Resources/platform folders
          android: {
            iconColor: new Color("#FFFFFF") // optional, leave out if you don't need it
          },
          onTap: () => { console.log("showCustomIcon tapped") }
        });
      });
      
    }

    getChats(idProfesor:string): Observable<any> {
      return new Observable((observer: any) => {
        let path = "/Chats/"+idProfesor+"/";

        console.log("Path get chats:"+path);
        
          let onValueEvent = (snapshot: any) => {
            this.ngZone.run(() => {
              let results = this.handleChatSnapshot(snapshot.value);
               observer.next(results);

               //console.log(snapshot.value);

            });
          };
          firebase.addValueEventListener(onValueEvent, `/${path}`);
      })//share();
    }

    /*publishUpdates() {
      this._allYowls.sort(function(a, b){
          if(a.date < b.date) return -1;
          if(a.date > b.date) return 1;
        return 0;
      })
      this.yowls.next([...this._allYowls]);
    }*/
    publishChatUpdates() {
      this._allChats.sort(function(a, b){
          if(a.date > b.date) return -1;
          if(a.date < b.date) return 1;
        return 0;
      })
      this.chats.next([...this._allChats]);
    }


    handleChatSnapshot(data: any) {
      //empty array, then refill and filter
      this._allChats = [];
      if (data) {
        for (let id in data) {        
          let result = (<any>Object).assign({id: id}, data[id]);
            this._allChats.push(result);
        }
        this.publishChatUpdates();
      }
      return this._allChats;
    }

    chat(message:string, idProfesor:string, date:number) {
      //let chat = Chat; 
      console.log(message)  
      return firebase.push(
          "/Chats/"+idProfesor,
          { "message":message,
            "to": idProfesor,
            "from": BackendService.tokenKeyRepresentante,
            "date": 0 - date
          }
        ).then(
          function (result:any) {
            return "chatted";
          },
          function (errorMessage:any) {
            console.log(errorMessage);
          }); 
    }
    /*getMyGift(id: string): Observable<any> {
      return new Observable((observer: any) => {
        observer.next(this._allItems.filter(s => s.id === id)[0]);
      });
    }*/
    getUserData(): Promise<any> {
      return firebase.getValue('/representantes/'+BackendService.tokenKeyRepresentante);
    }
    getDatosProfesor(id:number): Promise<any> {
      return firebase.getValue('/representantes/'+BackendService.tokenKeyRepresentante+'/cursos/'+(id-1)+'/profesor');
    }
    getCurso(id:number): Promise<any> {
      return firebase.getValue('/representantes/'+BackendService.tokenKeyRepresentante+'/cursos/'+(id-1));
    }

    /*getTareas(id:any) {
      return firebase.getValue('/tareas/'+id+'/'); 
    }*/

    getAllRepresentantes() {
      return firebase.getValue('/listado/');
    }

    getChatInfoProfesores(): Promise<any> {
      return firebase.getValue('/listadoProfesores/'+BackendService.tokenKeyRepresentante)
    }

    getChatInfoRepresentantes(idCurso:any): Promise<any> {
      return firebase.getValue('/listadoRepresentantes/'+idCurso);
    }

    getCursoProfesor(id:number): Promise<any> {
      return firebase.getValue('/profesores/'+BackendService.tokenKeyProfesor+'/cursos/'+(id-1));
    }
    
    /*getCursos(): Promise<any> {
      return firebase.getValue('/representantes/'+BackendService.token+'/cursos');
    }*/
    getCursos(): Promise<any> {
      //console.log("get cursos");
      return firebase.getValue('/representantes/'+BackendService.tokenKeyRepresentante+'/cursos/');
      //return firebase.getValue('/cursos');
    }

    getCursosProfesor(): Promise<any> {
      //console.log("get cursos");
      return firebase.getValue('/profesores/'+BackendService.tokenKeyProfesor+'/cursos/');
      //return firebase.getValue('/cursos');
    }

    uploadFile(localPath: string, file?: any): Promise<any> {
      let filename = this.utils.getFilename(localPath);
      let remotePath = `${filename}`;
      
      return firebase.storage.uploadFile({
        remoteFullPath: remotePath,
        localFullPath: localPath,
        onProgress: function(status) {
            console.log("Uploaded fraction: " + status.fractionCompleted);
            console.log("Percentage complete: " + status.percentageCompleted);
        }
      });
  }

  getDownloadUrl(remoteFilePath: string): Promise<any> {
    return firebase.storage.getDownloadUrl({
      remoteFullPath: remoteFilePath})
    .then(
      function (url:string) {
        return url;
      },
      function (errorMessage:any) {
        console.log(errorMessage);
      });
}
agregarTareaRepresentante(idRepresentante:any, idCurso:string, tarea:NewTarea) {
  //representantes/ULkcfwOT8KUx5YspqUZKncNVCF12/cursos/0/tareasID/*

  console.log(idRepresentante)
  console.log(idCurso)
  console.log(tarea)

  console.log("-----------------------<<<<<<<<<")
  return firebase.update('/representantes/'+idRepresentante+'/cursos/'+idCurso+'/tareasID/'+tarea.id+'/', {
    archivoPath: "",
    color: tarea.color,
    descripcion: tarea.descripcion,
    fechaEntrega: tarea.fechaEntrega,
    fotoUrl: tarea.fotoUrl,
    id: (tarea.id+1),
    revisado: false,
    titulo: tarea.titulo

  })
}

actualizarCantidadTareasCurso(idCurso:any, cantidad_:number) {

  console.log("Actulizar cantidad Tareas")

  console.log(idCurso)
  console.log(cantidad_)
  return firebase.update('/cantidadTareasCurso/'+idCurso+'/', {
    cantidad: cantidad_
  })

}

getCantidadTareasCurso(){
  return firebase.getValue('/cantidadTareasCurso/');
}

guardarLista(idCurso:any, listado:any[]) {

  return firebase.push(
    '/lista/'+idCurso,
    {
      "fecha": new Date().getTime(),
      "lista": listado
    }
  )

}



agregarTarea(idCurso:any, tarea:NewTarea) {
  return firebase.push(
    "/tareas/"+idCurso,
    {
      "id": tarea.id,
      "archivoPath": tarea.archivoPath,
      "color": tarea.color,
      "descripcion": tarea.descripcion,
      "fechaEntrega": tarea.fechaEntrega,
      "fotoUrl": tarea.fotoUrl
    }
  ).then(
    function (result:any) {
      return 'Gift added to your wishlist!';
    },
    function (errorMessage:any) {
      console.log(errorMessage);
    });
}

    getLista(): Observable<any> {
      //console.log("GETCURSOS")
      return new Observable((observer: any) => {
        let path = '/representantes/'+BackendService.tokenKeyRepresentante+'/cursos';
        
          let onValueEvent = (snapshot: any) => {
            this.ngZone.run(() => {
              console.log("--->"+snapshot)
              console.log(JSON.stringify(snapshot))
              //let results = this.handleSnapshot(snapshot.value);
              //console.log(JSON.stringify(results))
               //observer.next(results);
            });
          };
          firebase.addValueEventListener(onValueEvent, `/${path}`);
      });              
    }
    getCursosListener(): any {
      let onValueEvent = function(result) {
        //console.log("Event type: " + result.type);
        //console.log("Key: " + result.key);
        //console.log("-->")
        console.log("Value: " + JSON.stringify(result.value));
      };
      firebase.addValueEventListener(onValueEvent, `/representantes/${BackendService.tokenKeyRepresentante}/`).then(
        function(listenerWrapper) {
          //let path = listenerWrapper.path;
          //let listeners = listenerWrapper.listeners; // an Array of listeners added
          // you can store the wrapper somewhere to later call 'removeEventListeners'
        }
      );
    }


    actualizarCurso(idCurso, idTarea, tarea): Promise<any> {
      //console.log("ID: "+id)
      //console.log("idTarea: "+idTarea)
      console.dir("Tarea: "+tarea)
      return firebase.update(
        '/representantes/'+BackendService.tokenKeyRepresentante+'/cursos/'+idCurso+'/tareasID/'+idTarea, {
          "id": tarea.id,
          "descripcion": tarea.descripcion,
          "fotoUrl": tarea.fotoUrl,
          "archivoPath": tarea.archivoPath,
          "color": tarea.color,
          "fechaEntrega":tarea.fechaEntrega,
          "revisado": tarea.revisado
        }
      );
    }
    login(user: User) {
      return firebase.login({
        type: firebase.LoginType.PASSWORD,
        email: user.email,
        password: user.password
      }).then((result: any) => {
            //BackendService.token = result.uid;
            /*BackendService.tokenKeyRepresentante = result.uid;
            //console.log(BackendService.tokenKeyRepresentante)
            //console.log("Estado: "+BackendService.isRepresentante())

            console.log(JSON.stringify(result))
            //console.log("Firebase Service :User login:-->"+JSON.stringify(result))
            return JSON.stringify(result);*/

            let data = (e) => {
              
              //console.dir(e)
              //BackendService.tokenKeyProfesor = "VAKxe9S9wXSJ3mBVchZs24yw97p2";
              //if()
              if(e.value!=null) {
                //console.log(JSON.stringify(result))
                BackendService.tokenKeyRepresentante = result.uid;
                console.log(BackendService.tokenKeyRepresentante)
                return JSON.stringify(result)
              }else {
                dialogs.alert({
                  title: "EduHome",
                  message: "No hemos encontrado tu cuenta.",
                  okButtonText: "Aceptar"
              }).then(() => {
                  console.log("Dialog closed!");
              });
              }
            }
            return firebase.query(data, '/representantes/', {
              singleEvent:true,
              orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'id' // mandatory when type is 'child'
            },
            range: {
                  type: firebase.QueryRangeType.EQUAL_TO,
                  value: result.uid
            },
            })


        }, (errorMessage: any) => {
          console.log(errorMessage)
          //console.log("Firebase Service :User error:-->"+errorMessage)
          //alert("Por favor revisa las credenciales");
          //alert("Unfortunately we could not find your account.")
          dialogs.alert({
            title: "EduHome",
            message: "No hemos encontrado tu cuenta.",
            okButtonText: "Aceptar"
        }).then(() => {
            console.log("Dialog closed!");
        });
          
        });
    }
    loginProfesor(user: User){

      return firebase.login({
        type: firebase.LoginType.PASSWORD,
        email: user.email,
        password: user.password
      }).then((result: any) => {
            //BackendService.token = result.uid;
            //console.log(BackendService.tokenKeyRepresentante)

            //console.log("Estado: "+BackendService.isRepresentante())
            //console.log("Firebase Service :User login:-->"+JSON.stringify(result))
            //return JSON.stringify(result);
            //console.log("data:");
            //console.log(JSON.stringify(result))
            

            //console.log(result.uid)
            //BackendService.tokenKeyProfesor = "VAKxe9S9wXSJ3mBVchZs24yw97p2";
            let data = (e) => {

              //console.dir(e)
              //BackendService.tokenKeyProfesor = "VAKxe9S9wXSJ3mBVchZs24yw97p2";
              //if()
              if(e.value!=null) {
                BackendService.tokenKeyProfesor = result.uid;
                console.log(BackendService.tokenKeyProfesor)
                return JSON.stringify(result)
              }
      
            }
            return firebase.query(data, '/profesores/', {
              singleEvent:true,
              orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'id' // mandatory when type is 'child'
            },
            range: {
                  type: firebase.QueryRangeType.EQUAL_TO,
                  value: result.uid
            },
            })

        }, (errorMessage: any) => {
          console.log(errorMessage)
          //console.log("Firebase Service :User error:-->"+errorMessage)
          //alert("Por favor revisa las credenciales");
          //alert("Unfortunately we could not find your account.")
        });

      
    }

  datosRepresentante(): Promise<any> {
    return firebase.getValue('/representantes/'+BackendService.tokenKeyRepresentante);
      //.then(result => {console.log(JSON.stringify(result.value))})
      //.catch(error => {console.log("Error: " + error)});
  }

  datosProfesor(): Promise<any> {
    return firebase.getValue('/profesores/'+BackendService.tokenKeyProfesor);
      //.then(result => {console.log(JSON.stringify(result.value))})
      //.catch(error => {console.log("Error: " + error)});
  }

  logout(){
    console.log("Cerrar sesion");
    if(BackendService.isProfesor()){
      firebase.unsubscribeFromTopic(BackendService.tokenKeyProfesor);
    }else {
      firebase.unsubscribeFromTopic(BackendService.tokenKeyRepresentante);
    }
    BackendService.tokenKeyProfesor = "";
    BackendService.tokenKeyRepresentante = "";
    firebase.unsubscribeFromTopic("tareas");
    //firebase.unsubscribeFromTopic("data");
    
    
    //firebase.unsubscribeFromTopic("mensajes/"+BackendService.tokenKeyRepresentante);
    //firebase.unsubscribeFromTopic("mensajes/"+BackendService.tokenKeyProfesor);
    firebase.logout();    
  }
}