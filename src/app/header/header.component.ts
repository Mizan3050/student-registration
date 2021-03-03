import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  constructor(private authService: AuthService, private route:Router) { }
  isLoggedIn : boolean;
  currentUser:string;
  ngOnInit(): void {

    //checks if user is logged in
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser===null) {
        this.isLoggedIn = false
    } else {
        this.isLoggedIn = true;
    }      
    console.log(this.isLoggedIn);
    
  }
  onLogOut(){
    this.authService.logOut();
    this.route.navigate(['/login'])
  }
}
