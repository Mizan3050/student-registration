import { Component, OnInit } from '@angular/core';
import {StudentService} from '../services/student.service';
import {Student} from '../models/student'
import { AuthService } from '../services/auth.service';
import {  Router } from '@angular/router';
import { IsUndefinedPipe } from '../checknull.pipe';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  public listOfStudents:Student[] = [];
  constructor( private student: StudentService, private authService : AuthService, private route:Router) { }

  //loading student list data
  ngOnInit(): void {
    const {transform: isUndefined} = new IsUndefinedPipe();
    if(this.student.studentData){
      this.listOfStudents = this.student.studentData;
    }
    else{
      this.student.getStudentList().subscribe( (students:Student[]) =>{
        this.listOfStudents = students
      })
    }
    
  }

  //deleting student from dom and sending delete request to the server
  deleteStudent(item:number,i:number){
    this.listOfStudents.splice(i,1);
    this.student.deleteStudent(item).subscribe();
  }

  updateStudent(i:number, id:number){
    if(!this.authService.loggedIn){
      this.route.navigate(['/login']);
    }
    else{
      this.student.toUpdate = true;
      this.student.updateId = id;
      this.route.navigate([`/updateStudent/${i}`]);
      console.log(i);
      
    }
  }
}
