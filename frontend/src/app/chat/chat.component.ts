import { Component, OnDestroy,ElementRef, ViewChild } from '@angular/core';
import { ChatserviceService } from '../services/chatservice.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/apicaller.service';


interface HalfChat{
  message:string,
  date:Date,
  left:Boolean //boolean die zal zeggen of message links of rechts komt
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})



export class ChatComponent implements OnDestroy {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  message:string=""
  messages:HalfChat[] = []
  sender:string = ""
  receiver:string = ""
  constructor(private chatservice:ChatserviceService,private active:ActivatedRoute,private api:ApiService){
    this.active.params.subscribe(p => {
      this.sender=p["sender"]
      this.receiver=p["receiver"]
      this.api.getMessage(this.sender,this.receiver).subscribe(messages => {
        console.log(messages)
        for(let m of messages.chats){
          let left=false
          if(m.receiver === this.receiver)//wij hebben het verzonden dus zet links..
            left = true
          this.messages.push({message:m.message,date:this.parseDateString(`${m.date}`),left})
        }
      })
      console.log("trying to connect")
      this.chatservice.connect(this.sender)
    })
  }

  ngOnDestroy(): void {
    // Disconnect and unsubscribe when component is destroyed
    this.chatservice.disconnect();
  }

  sendMessage(){
    if(!(this.message === "")){
      this.messages.push({message:this.message,date:new Date(),left:true})
      this.chatservice.sendMessage(this.sender,this.receiver,this.message)
      this.scrollToBottom()
    }
  }

  ngOnInit(){
    this.chatservice.receiveMessage().subscribe(message => {
      console.log(message)
      
    })
  }
  parseDateString(dateString: string): Date {
    const withoutMilliseconds = dateString.split('.')[0]; // Remove milliseconds
    return new Date(withoutMilliseconds);
  }

  scrollToBottom() {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  } catch(err) { }        
  }
}
