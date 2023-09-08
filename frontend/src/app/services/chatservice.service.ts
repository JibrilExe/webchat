import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject,WebSocketSubjectConfig } from 'rxjs/webSocket';
import { ApiService } from './apicaller.service';

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {
  private socket: WebSocketSubject<any>;

  constructor(private api:ApiService) {
    const webSocketConfig: WebSocketSubjectConfig<any> = {
      url: 'ws:localhost:8080',
    };

    this.socket = webSocket(webSocketConfig);
  }
  connect(userId:string){
    console.log("test");
    this.socket.next({ userId: userId });
  }

  disconnect(): void {
    this.socket.complete();
  }

  sendMessage(userId:string,receiver:string,message:string){
    console.log(`${message} in service`)
    this.api.sendMessage(userId,receiver,message).subscribe(x => console.log(x))
    this.socket.next({"sender":userId,"receiver":receiver,"message":message})
  }

  receiveMessage():Observable<any>{
    return this.socket.asObservable()
  }
}
