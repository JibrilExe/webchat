import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { WeatherComponent } from './weather/weather.component';
import { FriendsComponent } from './friends/friends.component';
import { LoginService } from './services/login.service';
import { UserComponent } from './user/user.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatComponent } from './chat/chat.component';
const config: SocketIoConfig = { url: 'ws://localhost:8080', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WeatherComponent,
    FriendsComponent,
    UserComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    [SocketIoModule.forRoot(config)]
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
