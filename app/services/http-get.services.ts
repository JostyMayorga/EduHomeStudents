import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { getString } from "tns-core-modules/application-settings/application-settings";

@Injectable()
export class MyHttpGetService {
    private serverUrl = "http://shatterharts.com/services/eduhomestudent.php?email="+getString("email")+"&type=log";
    private tasksURL = "http://shatterharts.com/services/eduhomestudent.php?student_id="+getString("idStudent")+"&type=homw"
    constructor(private http: HttpClient) { }

    getData() {
        console.log("get data")
        return this.http.get(this.serverUrl);
    }

    getTasks(){
        console.log("get tasks")
        return this.http.get(this.tasksURL);
    }

}