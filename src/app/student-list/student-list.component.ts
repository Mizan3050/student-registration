import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import {Student} from '../models/student'
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  public listOfStudents:Student[] = [];
  constructor( private student: StudentService) { }

  //loading student list data
  ngOnInit(): void {
    this.listOfStudents = this.student.studentData;
    console.log("this is student");  
  }

  //deleting student from dom and sending delete request to the server
  deleteStudent(item:number,i:number){
    this.listOfStudents.splice(i,1);
    this.student.deleteStudent(item).subscribe();
  }

  updateStudent(i:number){
    this.student.toUpdate = true;
  }
}
