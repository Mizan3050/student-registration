import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  listOfStudents : any = [];
  constructor( private student: StudentService) { }

  ngOnInit(): void {
    this.student.getStudentList().subscribe(result=>{
      console.log(result);
      this.listOfStudents = result;
    })
  }

  deleteStudent(i){
    this.listOfStudents.splice(i);
    // this.student.deleteStudent(i).subscribe();
    console.log(i);
  }

  updateStudent(i){
    this.student.toUpdate = true;
    console.log(i);
    // this.student.getStudentToUpdate(i).subscribe(result=>{
    //   console.log(result);
    // })
  }
}
