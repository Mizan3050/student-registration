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
  
  get username(){
    return this.studentLogin.get('username');
  }
  get password(){
    return this.studentLogin.get('password');
  }
  ngOnInit(): void {
    this.studentLogin = this.fb.group({
      username:['', [Validators.required, Validators.minLength(3)]],
      password:['', [Validators.required,  Validators.minLength(3)]],
    })
    if(this.authService.loggedIn){ 
      this.isLoggedIn = this.authService.isAuthenticated(); //use service variable, use semi colon  
    }
    else{
      this.isLoggedIn = this.authService.isAuthenticated();
    }
    console.log(this.isLoggedIn);
    
  }
  loginStudent(){
      this.authService.logIn(this.studentLogin.value);
      if(this.authService.loggedIn){
        this.route.navigate(['/studentList']); 
      }
       
  }
}
