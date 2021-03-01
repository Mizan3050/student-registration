import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    loggedIn:boolean = false;
    
    //checks if user is logged in
    isAuthenticated(){
        return this.loggedIn;
    }

    //sets user to logged in 
    logIn(){
        this.loggedIn = true
    }
    //user log out
    logOut(){
        this.loggedIn = false;
    }
}