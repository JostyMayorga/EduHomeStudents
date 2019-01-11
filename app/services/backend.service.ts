import { Injectable } from "@angular/core";
import { getString, setString } from "tns-core-modules/application-settings";

const tokenKeyRepresentante = "";
const tokenKeyProfesor = "";
const personaje = "";

//const rol = "rol";
export class BackendService {


  static esPrimeraVez():boolean {
    return !!getString("personaje");
  }

  static set personaje(personaje: string) {
    setString("personaje", personaje);
  }


  static isRepresentante():boolean {
    return !!getString("representante");
  }
  static get tokenKeyRepresentante(): string {
    return getString("representante");
  }

  static set tokenKeyRepresentante(theToken: string) {
    setString("representante", theToken);
  }

  static isProfesor():boolean {
    return !!getString("profesor");
  }
  static get tokenKeyProfesor(): string {
    return getString("profesor");
  }

  static set tokenKeyProfesor(theToken: string) {
    setString("profesor", theToken);
  }
  /*
  static set rol(rol: string) {
    setString("rol", rol);
    //P = profesor, R = representante
  }
  static get rol() {
    return getString("rol");
    //P = profesor, R = representante
  }
  static isProfesor(): boolean {
    return !!getString("rol");
  }
   static isLoggedIn(): boolean {
    return !!getString("token");
  }

  static get token(): string {
    return getString("token");
  }

  static set token(theToken: string) {
    setString("token", theToken);
  }*/
}