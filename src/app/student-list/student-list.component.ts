<<<<<<< Updated upstream
import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import {Student} from '../models/student'
=======
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import {StudentService} from '../services/student.service';
import {Student} from '../models/student'
import { AuthService } from '../services/auth.service';
import {  Router } from '@angular/router';
import { IsUndefinedPipe } from '../checknull.pipe';
import {FONT_SIZE, fontSize, FontSize} from '../models/demoInterface';
import { BehaviorSubject, observable} from 'rxjs';

>>>>>>> Stashed changes
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class StudentListComponent implements OnInit {

<<<<<<< Updated upstream
  public listOfStudents:Student[] = [];
  constructor( private student: StudentService) { }

  //loading student list data
  ngOnInit(): void {
    this.listOfStudents = this.student.studentData;
    console.log("this is student");  
=======
  public listOfStudents$ :BehaviorSubject <Student[]>;
  constructor( private student: StudentService, private authService : AuthService, private route:Router, @Inject(FONT_SIZE) fontSize: FontSize) { }

  //loading student list data
  ngOnInit(): void {
    this.listOfStudents$ = new BehaviorSubject([]);
    // console.log(fontSize);
    const {transform: isUndefined} = new IsUndefinedPipe();
    if(this.student.studentData){
      this.listOfStudents$.next(this.student.studentData);
    }
    else{
      this.student.getStudentList().subscribe( (students:Student[]) =>{
        this.listOfStudents$.next(students);
      })
    }    
>>>>>>> Stashed changes
  }

  //deleting student from dom and sending delete request to the server
  deleteStudent(item:number,i:number){
    this.listOfStudents$.getValue().splice(i,1);
    this.student.deleteStudent(item).subscribe();
  }

  updateStudent(i:number, id:number){
    this.student.toUpdate = true;
    this.student.updateId = id;
  }
}
