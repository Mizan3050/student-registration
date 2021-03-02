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

  ngOnInit(): void {
    console.log(this.authService.loggedIn);
  }
  onLogOut(){
    this.authService.logOut();
    this.route.navigate(['/login'])
  }
}
