import { Component } from '@angular/core';
import { ApiService } from '../services/apicaller.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username:string = "";
  password:string = "";
  error:boolean = false;
  errorText: String = "";
  users:string[] = [];
  constructor(private auth:LoginService,private route: Router){}

  create(){
    console.log("tryingtocreate")
    this.auth.create({"username":this.username,"password":this.password}).subscribe(e =>{
      if(!("error" in e)){
        this.auth.logged_in = true
        this.auth.username = this.username
        this.route.navigate([`/users/${this.username}`])
      }
      else{
        console.log(e)
        this.errorText = "username is taken"
      }
    })
  }

  login(){
    this.auth.login({"username":this.username,"password":this.password}).subscribe(e => {
      if(!("error" in e)){
        if(e.password === this.password){
          this.auth.logged_in = true
          this.auth.username = this.username
          this.route.navigate([`/users/${this.username}`])
        }
        else{
          this.errorText = "wrong password"
        }
      }
      else{
        console.log(e)
        this.errorText = "username doesnt exist"
      }
    })
  }

  tryRedirect(name:string){
      
  }
}

