import { Component, OnInit, SimpleChanges } from '@angular/core';
import {FormBuilder, Validators, FormArray, MinLengthValidator, FormArrayName, FormGroup, FormControl} from '@angular/forms';

enum RadioOption{
  sports = "sports",
  others = "others",
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  age : number;
  curricularOption = RadioOption;

  get name(){
    return this.studentRegisteration.get('name');
  }

  get username(){
    return this.studentRegisteration.get('username');
  }

  get dateob(){
    return this.studentRegisteration.get('dateob');
  }  

  //initializing formbuilder
  constructor (private fb:FormBuilder){}
  studentRegisteration = this.fb.group({
  })


  ngOnInit(): void {
    console.log("app");

    //initializing registraion form 
    this.studentRegisteration = this.fb.group({
      name:['', [Validators.required, Validators.minLength(3)]],
      username:['', [Validators.required,  Validators.minLength(3)]],
      address:[''],
      city:[''],
      dateob:['', this.dateValidator.bind(this)],
      extraCur:['sports'],
      other:[''],
      sports: new FormArray([]),
      hobbies: new FormArray([]),
    })

    //checks students age aftering entering date of birth

  }

  //submitting form data
  registerStudent(){
    console.log(this.studentRegisteration.value);
    this.studentRegisteration.reset();

    //clearing sports formarray
    (<FormArray>this.studentRegisteration.controls['sports']).clear();
    //clearing hobbies formarray
    (<FormArray>this.studentRegisteration.controls['hobbies']).clear();
  }



  //deleting sport from sports formarray
  deleteSport(i:number){
    (<FormArray>this.studentRegisteration.controls['sports']).removeAt(i);
  }

  //deleting sport from hobbies formarray
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
    return (this.age>15? {'legalAge': true} : null);
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
    this.studentRegisteration.value.studentAge = this.age;
    return this.age;
  }
}
