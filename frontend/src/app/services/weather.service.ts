import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../weather/weather';
 
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private url = "https://api.weatherapi.com/v1/current.json?key=";
  private key = "e89a992012ee4d7394e140303230109";

  constructor(private httpClient: HttpClient) { }

  getWeather(q: String){
    return this.httpClient.get<Weather>(this.url + this.key + "&q=" + q + "&api=no");
  }
}
