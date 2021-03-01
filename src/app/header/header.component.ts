import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  item:string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.item = localStorage.getItem('currentUser');
    console.log(!this.item==null);
    if(!this.item==null){
      return null
    }
    else{
      this.authService.logIn();
    }
    console.log(this.authService.loggedIn);
    
  }
  onLogOut(){
    this.authService.logOut();
    localStorage.removeItem('currentUser');
  }
}
