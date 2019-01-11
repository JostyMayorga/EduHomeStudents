import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

import { BackendService } from "./services/backend.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (BackendService.isRepresentante()) {
      return true;
    }
    else if(BackendService.isProfesor()){
      //this.router.navigate(["/login"]);
      this.router.navigate(["/profesor"]);
      return false;
    }else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}