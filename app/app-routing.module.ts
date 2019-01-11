import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { BrowseComponent } from "./browse/browse.component";
import { HomeComponent } from "./home/home.component";
import { HomeDetalleComponent } from "./home-detalle/home-detalle.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { SearchComponent } from "./search/search.component";
import { HomeworkComponent } from "./homework/homework.component";
import { LoginComponent } from './login/login.component';
import { MainComponent } from "./main/main.component";
import { AuthGuard } from "./auth-guard.service";
import { AuthGuardProfesor } from "./auth-guard-profesor.service";
import { HistoriasComponent } from "./historias/historias.component";
import { BoletinComponent } from "./boletin/boletin.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { InfoComponent } from "./info/info.component";
import { AchievementsComponent } from "./achievements/achievements.component";
import { PrimerCapituloComponent } from "./primercapitulo/primercapitulo.component"


export const COMPONENTS = [PrimerCapituloComponent, BrowseComponent, HomeComponent, ItemDetailComponent, SearchComponent, LoginComponent, MainComponent, HomeworkComponent, HomeDetalleComponent,HistoriasComponent, BoletinComponent, PerfilComponent, InfoComponent, AchievementsComponent];


export const authProviders = [
    AuthGuard,
    AuthGuardProfesor
  ];

const routes: Routes = [

    { path: "", redirectTo: "main", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "main", component: MainComponent, canActivate: [AuthGuard],
        children: [
            //{path: "homework", component: HomeworkComponent},
            {path: "historias", component: HistoriasComponent},
            {path: "home", component: HomeComponent},
            {path: "primercapitulo", component: PrimerCapituloComponent},
            {path: "curso/:id", component: HomeDetalleComponent},
            {path: "perfil/:tipo", component: PerfilComponent, 
                children:[
                {path: "", redirectTo: "info", pathMatch: "full" },
                {path: "info", component: InfoComponent},
                {path: "achievements", component: AchievementsComponent}
            ]},
    ]},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
    
})
export class AppRoutingModule { }
