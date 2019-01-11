import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Student} from '../shared/student.model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  readonly API_URL = "https://jsonplaceholder.typicode.com/users";

  constructor(private http:HttpClient) {
   }
}