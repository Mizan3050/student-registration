import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  studentDetail:Student[];
  constructor(private router: ActivatedRoute, private student:StudentService, private fb:FormBuilder, private route : Router) { }
  public loading: boolean;
  faSpinner = faSpinner;
  fas = fas;
  favSubject = this.fb.group({
    subjectName: ['', [Validators.required, Validators.minLength(3)]]
  })
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
favouriteSubject(){
  this.loading = true;
  this.studentDetail[0].favSubject = this.favSubject.controls['subjectName'].value;
  this.student.patchStudentValue(this.studentDetail[0].id, this.studentDetail[0]).subscribe(res =>{
    if(res){
      this.loading=false;
      this.route.navigate(['/studentList']);
    }
  },
  error=>{
    this.loading = false;
  });
}
}
  
