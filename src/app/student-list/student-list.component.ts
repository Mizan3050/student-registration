import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import {Student} from '../models/student'
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.listOfStudents = this.student.studentData;
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
    }
  }
}
