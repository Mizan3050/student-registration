import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student} from '../models/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url1 = "http://localhost:3000/students";
  url = "https://jsonplaceholder.typicode.com/users"
  
  toUpdate:boolean = false;
  public studentData : Student[];
  updateId:number;
  constructor(private http : HttpClient) { }

  getStudentList() : Observable<Student[]>{
    return this.http.get<Student[]>(this.url);
  }
  
  addStudent(data){
    return this.http.post(this.url, data);
  }
  deleteStudent(id:number){
    return this.http.delete(this.url + `/${id}`);
  }

  getStudentToUpdate(id:number){
    return this.http.get(this.url + `/${id}`);
  }

  updateStudent(id:number, data){
    return this.http.put(this.url + `/${id}`, data);
  }

  patchStudentValue(id:number, data){
    return this.http.patch(this.url + `/${id}`, data);
  }
}
