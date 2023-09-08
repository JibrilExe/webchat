import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/apicaller.service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  friends: string[] = []

  constructor(private route: ActivatedRoute,private api:ApiService){}

  ngOnInit(){
    this.getUsers()
  }
  getUsers(){
    this.route.params.subscribe(params => {
      this.api.getUsernames().subscribe(names => {
        if("usernames" in names){
          //capture alle users
          this.friends = names.usernames
          this.api.getFriends(params['id']).subscribe(friends => {
            console.log(friends)
          })
        }
        console.log(names)
      })
    })
    
  }

  addFriend(name:string){
    this.route.params.subscribe(e =>{
      this.api.addFriend(e['id'],name)
    })
  }
}
