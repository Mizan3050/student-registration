import { partitionArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../student.service'
@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  routerId:number
  studentDetail:Student;
  constructor(private router: ActivatedRoute, private student:StudentService) { }

  ngOnInit(): void {
    this.router.params.subscribe((param)=>{
      this.studentDetail = this.student.studentData[param['id']]
    })
  }
  
}
