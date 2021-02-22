import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormArray, MinLengthValidator, FormArrayName, FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  birthYear = new Date();
  age:number = 18;

  get name(){
    return this.studentRegisteration.get('name');
  }

  get username(){
    return this.studentRegisteration.get('username');
  }

  //to check if student age is greater than 15
  getAge():boolean{
    return this.age < 15? true : false 
  }

  constructor (private fb:FormBuilder){}

  //initializin registraion form
  studentRegisteration = this.fb.group({
  })


  ngOnInit(): void {
    console.log("app");
    //populating form 
    this.studentRegisteration = this.fb.group({
      name:['', [Validators.required, Validators.minLength(3)]],
      username:['', [Validators.required,  Validators.minLength(3)]],
      address:[''],
      city:[''],
      dateob:[''],
      extraCur:['sports'],
      other:[''],
      sports: new FormArray([]),
      hobbies: new FormArray([]),
    })

    //checks students age aftering entering date
    this.studentRegisteration.get('dateob').valueChanges.subscribe((value:Date) =>{
      this.checkAge(value);
      this.getAge();
    })
  }

  //submitting form data
  registerStudent(){
    console.log(this.studentRegisteration.value);
    this.birthYear = new Date(this.studentRegisteration.value.dateob);
    this.studentRegisteration.reset();

    //clearing sports formarray
    const control = <FormArray>this.studentRegisteration.controls['sports'];
        for(let i = control.length-1; i >= 0; i--) {
            control.removeAt(i)
        }
    
    //clearing hobbies formarray
    const control2 = <FormArray>this.studentRegisteration.controls['hobbies'];
    for(let i = control2.length-1; i >= 0; i--) {
        control2.removeAt(i)
      }
  }

  //age of student custom validation
  checkAge(birthYear: Date){
    const year = new Date(birthYear);
    const today = new Date();
    this.age = today.getFullYear() - year.getFullYear();
    const m = today.getMonth() - year.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < year.getDate())) {
      this.age--;
      return this.age >17 ? {'legal': true} : null;
    }
    return this.age;
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
}
