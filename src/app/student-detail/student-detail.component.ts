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

<<<<<<< Updated upstream
  routerId:number
  studentDetail:any
  constructor(private router: ActivatedRoute, private student:StudentService) { }

=======
  studentDetail: Student[];
  constructor(private router: ActivatedRoute, private student:StudentService, private fb:FormBuilder, private route : Router) { }
  public loading: boolean;
  faSpinner = faSpinner;
  fas = fas;
  favSubject = this.fb.group({
    subjectName: ['', [Validators.required, Validators.minLength(3)]]
  })
>>>>>>> Stashed changes
  ngOnInit(): void {
    this.router.params.subscribe((param)=>{
      this.studentDetail = this.student.studentData[param['id']]
    })
  }
  
}
