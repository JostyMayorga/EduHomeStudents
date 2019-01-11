import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";

//import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
//import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AppRoutingModule, COMPONENTS, authProviders } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";

import { BackendService } from "./services/backend.service";
import { FirebaseService } from "./services/firebase.service";

import { registerLocaleData } from '@angular/common';
import esEC from '@angular/common/locales/es';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { UtilsService } from "./utils/util.service";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
registerLocaleData(esEC)

@NgModule({
    providers: [
    BackendService,
    FirebaseService,
    authProviders,
    UtilsService,
    { provide: esEC, useValue: 'es' }
],
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        CoreModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule,
        TNSCheckBoxModule,
        HttpClientModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        AppComponent,
        ...COMPONENTS
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
