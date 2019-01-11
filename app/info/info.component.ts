import {Component, OnInit} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { FirebaseService } from "../services/firebase.service";
import { MyHttpGetService } from "../services/http-get.services";


@Component({
    selector: 'Info',
    moduleId: module.id,
    templateUrl: "./info.component.html",
    styleUrls: ['./info.component.css'],
    providers: [MyHttpGetService]
})

export class InfoComponent implements OnInit {
    public id: string;
    public email: string;
    public name: string;
    public birthdate: string;
    public experience: string;
    public health: string;
    constructor(private myService: MyHttpGetService, private router: RouterExtensions, private firebaseService:FirebaseService) {
    }
    


    public ngAfterViewInit() {
        //console.dir(this.listaNombres)
    }

    extractData() {
        console.log("extract data")
        this.myService.getData()
            .subscribe((result) => {
                this.onGetDataSuccess(result);
            }, (error) => {
                console.log(error);
            });
    }

    private onGetDataSuccess(res) {
        console.log("on data success")
        console.log(res)
        this.id = res.id;
        this.name = res.name;
        this.email = res.email;
        this.birthdate = res.birthdate;
        console.log(this.email)
    }
    
    ngOnInit () {
        this.extractData();
    }

}
