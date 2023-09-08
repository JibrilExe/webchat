import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Weather } from './weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  weather!: Weather;
  city:String = "Gent";

  constructor(private weatherservice:WeatherService) {
  }

  ngOnInit() {
    this.loadWeather();
  }
  loadWeather(){
    if ((!(navigator == undefined)) && ("geolocation" in navigator)) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.city = position.coords.latitude + "/" + position.coords.longitude;
        },
        (error) => {
          this.fetchWeather()
        }
      );
    } else {
      console.log('Geolocation is not available in this browser.');
    }
    this.fetchWeather()
    
  }
  fetchWeather(){
    this.weatherservice.getWeather(this.city)
      .subscribe(response => {
        this.weather = response;
      });
  }
}
