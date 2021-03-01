import { Component, OnInit ,OnDestroy } from '@angular/core';
import {FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import {StudentService} from '../services/student.service';
import {ActivatedRoute, Router} from '@angular/router'
import {Student} from '../models/student';
import { AuthService } from '../services/auth.service';

enum RadioOption{
  sports = "sports",
  others = "others",
}

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit, OnDestroy  {

  age : number;
  curricularOption = RadioOption;
  studentRegisteration: FormGroup;
  toUpdate = false;
  alert = false;
  alertCreate = false;
  routerId:number;
  
  get name(){
    return this.studentRegisteration.get('name');
  }

  get username(){
    return this.studentRegisteration.get('username');
  }

  get dateOfBirth(){
    return this.studentRegisteration.get('dateOfBirth');
  }  

  //initializing formbuilder
  constructor (private fb:FormBuilder, private student: StudentService, private router: ActivatedRoute, private navigator: Router, private log : AuthService){}



  ngOnInit(): void {
    //initializing registraion form 
      this.studentRegisteration = this.fb.group({
      name:['', [Validators.required, Validators.minLength(3)]],
      username:['', [Validators.required,  Validators.minLength(3), Validators.pattern('[a-zA-Z0-9 _-]*')]],
      address:[''],
      city:[''],
      dateOfBirth:['', this.dateValidator.bind(this)],
      extraCurricular:[this.curricularOption.sports],
      other:[''],
      sports: new FormArray([]),
      hobbies: new FormArray([]),
    })
    this.toUpdate = this.student.toUpdate;

    //getting student id tht is to be updated
    if(this.toUpdate){
      this.router.paramMap.subscribe((result)=>{
        this.routerId= +result.get('id');
        if(this.routerId){
          //calling getStudent to populated form to be updated
          this.getStudent(this.student.updateId);
        }
      })
    }
  }

  //populating data in the form
  getStudent(id:number){
    const data = this.student.studentData[id];
    this.studentRegisteration.patchValue({
      name: data.name,
      username:data.username,
      address:data.address,
      city:data.city,
      dateOfBirth:data.dateOfBirth,
      other:data.other
    })
  }

  //adding a student
  registerStudent(){
    this.student.addStudent(this.studentRegisteration.value).subscribe((result:Student)=>{
        this.student.studentData.push(result);
    });
    this.studentRegisteration.reset();
    //clearing sports formarray
    (<FormArray>this.studentRegisteration.controls['sports']).clear();
    //clearing hobbies formarray
    (<FormArray>this.studentRegisteration.controls['hobbies']).clear();
    this.navigator.navigate(['/studentList']);
  }

  //update student
  updateStudent(){
    //updating values in dom array
    this.student.studentData[this.student.updateId] = this.studentRegisteration.value;
    this.student.studentData[this.student.updateId].id = +this.routerId;
    this.student.updateStudent(this.router.snapshot.params.id, this.studentRegisteration.value).subscribe( result=>{
    }); 
    this.navigator.navigate(['/studentList']);
  }
  //deleting sport from sports formarray
  deleteSport(i:number){
    (<FormArray>this.studentRegisteration.controls['sports']).removeAt(i);
  }

  //deleting hobby from hobbies formarray
  deleteHobby(i:number){
    (<FormArray>this.studentRegisteration.controls['hobbies']).removeAt(i);
  }

  //adding hobbies to hoobies form array
  getHobbies(){
    return (<FormArray>this.studentRegisteration.get('hobbies')).controls;
  }
  addHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray> this.studentRegisteration.controls['hobbies']).push(control);
  }

  //adding sports to sports oobies form array
  getSports(){
    return (<FormArray>this.studentRegisteration.get('sports')).controls;
  }
  addSport(){
    const control = new FormControl(null, Validators.required);
    (<FormArray> this.studentRegisteration.controls['sports']).push(control);
  }

  //custom date validator
  dateValidator(control: FormControl): {[s:string]: boolean} {
    // implementation of the validation
    this.checkAge(control.value);
    return (this.age < 15? {'legalAge': true} : null);
}

  //age of student custom validation
  checkAge(birthDate: Date){
    const birthYear = new Date(birthDate);
    const today = new Date();
    this.age = today.getFullYear() - birthYear.getFullYear();

    //calculating age with birth month
    const month = today.getMonth() - birthYear.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthYear.getDate())) {
      this.age--;
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.student.toUpdate = false;
  }
}
