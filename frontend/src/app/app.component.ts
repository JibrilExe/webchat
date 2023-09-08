import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'BelgianPoliticShit';
  logged = false;
  username = "";
  constructor(public log:LoginService) {
  }

  ngOnInit() {
    this.logged = this.log.logged_in
    this.username = this.log.username
    //this.loadWeather();
  }
}
