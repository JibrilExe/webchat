import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WeatherComponent } from './weather/weather.component';
import { FriendsComponent } from './friends/friends.component';
import { loggedInGuard } from './logged-in.guard';
import { UserComponent } from './user/user.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate:[loggedInGuard] },
  { path: 'weather', component: WeatherComponent},
  { path: 'users/:id',component:UserComponent},
  //{ path: 'users/:id/friends',component: FriendsComponent}, voor later
  { path: 'users/:sender/chat/:receiver',component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }