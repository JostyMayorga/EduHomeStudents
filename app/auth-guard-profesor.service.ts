import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

import { BackendService } from "./services/backend.service";

@Injectable()
export class AuthGuardProfesor implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (BackendService.isProfesor()) {
      return true;
    }
    else if(BackendService.isRepresentante()){
      //this.router.navigate(["/login"]);
      this.router.navigate(["/main"]);
      return false;
    }else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}