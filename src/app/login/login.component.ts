import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  studentLogin : FormGroup

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
      //sending login request to auth service
      this.authService.logIn();
      this.authService.loggedIn = true;
      this.route.navigate(['/studentList']);  
      localStorage.setItem('currentUser', JSON.stringify(this.studentLogin.value))
  }
}
