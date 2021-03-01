import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    loggedIn:boolean = false;
    
    
    isAuthenticated(){
        return this.loggedIn;
    }

    logIn(){
        this.loggedIn = true
    }
    logOut(){
        this.loggedIn = false;
    }
}