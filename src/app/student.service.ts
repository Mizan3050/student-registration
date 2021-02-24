import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = "http://localhost:3000/students";
  studentData :any;
  toUpdate:boolean = false;
  constructor(private http : HttpClient) { }

  getStudentList(){
    return this.http.get(this.url);
  }

  addStudent(data){
    return this.http.post(this.url, data);
  }
  deleteStudent(id){
    return this.http.delete(this.url + `/${id}`);
  }

  getStudentToUpdate(id){
    return this.http.get(this.url + `/${id}`);
  }

  updateStudent(id, data){
    return this.http.put(this.url + `/${id}`, data);
  }
}
