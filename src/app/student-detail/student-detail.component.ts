import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service'
@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  studentDetail:any
  constructor(private router: ActivatedRoute, private student:StudentService) { }

  ngOnInit(): void {
    if(this.student.studentData){
      this.router.params.subscribe((param)=>{
        this.studentDetail = this.student.studentData.filter(
          student=> student.id === +param['id']
        )
      });
    }
    else{
    this.student.getStudentList().subscribe(()=>{
      this.router.params.subscribe((param)=>{
        this.studentDetail = this.student.studentData.filter(
          student=> student.id === +param['id']
        )
      });
    })
  }
}
}
  
