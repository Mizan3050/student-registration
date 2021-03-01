import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  studentLogin : FormGroup
  // validUserName = "user"
  // validPassword = "user123"
  isLoggedIn = false;
  constructor(private fb:FormBuilder, private authService : AuthService, private route : Router) { }

  ngOnInit(): void {
    this.studentLogin = this.fb.group({
      username:['', [Validators.required, Validators.minLength(3)]],
      password:['', [Validators.required,  Validators.minLength(3)]],
    })
    if(this.authService.loggedIn){
      this.isLoggedIn = true
    }
    else{
      this.isLoggedIn = false
    }
  }
  loginStudent(){
    // if(this.studentLogin.controls['username'].value===this.validUserName && this.studentLogin.controls['password'].value===this.validPassword){
      this.authService.logIn();
      this.authService.loggedIn = true;
      this.route.navigate(['/studentList']);  
      localStorage.setItem('currentUser', JSON.stringify(this.studentLogin.value))
  }
}
