import { Injectable } from "@angular/core";
import { loginInput } from "../models/loginInput";

@Injectable()
export class AuthService {
    loggedIn:boolean = false;
    currentUser:String;

    logOut(){
        localStorage.removeItem('currentUser');
        this.isAuthenticated();
    }
    
    logIn(currentUser:loginInput){
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.isAuthenticated();
    }
    //checks if user is logged in
    isAuthenticated(){
        this.currentUser = localStorage.getItem('currentUser');
        if (this.currentUser===null) {
            return this.loggedIn = false
        } else {
            return this.loggedIn = true;
        } 
    }
}