import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/apicaller.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

interface half_frend{
  username:string,
  since:string
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {
  user:string = ""
  friended:half_frend[] = []
  not_friended:string[]=[]
  constructor(private ro:Router,private route: ActivatedRoute,private api:ApiService,private log:LoginService){

  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.user = params['id']
      this.getFriends()
    })
  }
  logout(){
    this.log.logged_in = false
    this.log.username = ""
    this.ro.navigate(["/"])
  }
  getFriends(){
    this.api.getUsernames().subscribe(users => {
      console.log(users.usernames)
      this.api.getFriends(this.user).subscribe(friendds => {
        this.not_friended = users.usernames
        let done = false
        let i = 0
        while(!done && i < this.not_friended.length){
          if(this.not_friended[i] === this.user){
            this.not_friended.splice(i,1)
            done = true
          }//anders zit huidige user ook in lijst...
          i+=1
        }
        let frends:half_frend[] = []
        let friends = friendds.friends
        for(let i = 0; i < friends.length; i+=1){
          if(friends[i].user1 === this.user){
            frends.push({"username":friends[i].user2,"since":friends[i].since})
          }
          else{
            frends.push({"username":friends[i].user1,"since":friends[i].since})
          }
        }
        this.friended = frends
        frends.forEach(f => {
          this.not_friended = this.not_friended.filter(user => {
            return !(f.username === user)
          })
        })
      })
    })
  }

  addFriend(friend:string){
    this.api.addFriend(this.user,friend).subscribe(x => {
      console.log(x)
      this.getFriends()
    })//update friend list
  }
}
