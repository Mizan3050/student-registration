import { Component, OnInit } from '@angular/core';
import {StudentService} from "./services/student.service"
import {Student} from './models/student'
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = "udem-app";
  //initializing formbuilder
  constructor (private student:StudentService){}



  ngOnInit(): void {
    this.student.getStudentList().subscribe((result:Student[])=>{
      this.student.studentData = result;
    })

  }
}
