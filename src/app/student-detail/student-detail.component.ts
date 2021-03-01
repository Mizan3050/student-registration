import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StudentService } from '../student.service'
@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  routerId:number
  studentDetail:any
  constructor(private router: ActivatedRoute, private student:StudentService) { }

  ngOnInit(): void {
    this.router.params.subscribe((param)=>{
      this.studentDetail = this.student.studentData[param['id']]
    })
    this.student.getStudentList().subscribe((result)=>{
      this.studentDetail = result[this.studentDetail.id-1];
      console.log(result[this.studentDetail.id-1].id)
      this.routerId = result[this.studentDetail.id-1].id;
    })
}
}
  
