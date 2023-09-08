
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../login/user';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

interface Usernames{
  usernames:string[]
}
interface Friends{
  friends:Friend[]
}
interface Friend{
  user1:string,
  user2:string,
  since:string
}
interface Message{
  message:string
}

interface Chat{
  sender:string,
  receiver:string,
  message:string,
  date:number
}
interface Chats{
  chats:Chat[]
}
@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private baseUrl = 'http://127.0.0.1:5000/api'; // Replace with your Flask API URL

  constructor(private http: HttpClient) {}

  fetchData(end:string) {
    return this.http.get<any>(`${this.baseUrl}/${end}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of({ error: 'Resource not found' });
        }
        else{
          return of({error:"Other http error"})
        }
      })
    );
  }

  getUsernames(): Observable<Usernames> {
    return this.fetchData('users')
  }

  getUserPass(username: string): Observable<User> {
    return this.fetchData(`users/${username}`)
  }

  addUser(user: User): Observable<any> {
    return this.http.post<User>(`${this.baseUrl}/addUser`, user);
  }

  addFriend(u1:string,u2:string){
    return this.http.post(`${this.baseUrl}/users/${u1}/friends/add/${u2}`,"")
  }

  getFriends(u1:string):Observable<Friends>{
    return this.http.get<Friends>(`${this.baseUrl}/users/${u1}/friends`)
  }
  // Add other API methods here
  sendMessage(sender:string,receiver:string,message:string){
    console.log("SENDING TO BASE")
    return this.http.post<Message>(`${this.baseUrl}/users/${sender}/chat/${receiver}`,{"message":message})
  }
  getMessage(sender:string,receiver:string):Observable<Chats>{
    return this.http.get<Chats>(`${this.baseUrl}/users/${sender}/chat/${receiver}`)
  }
}
