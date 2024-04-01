import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { Forecast } from '../shared/weather.model';
import { getWeatherIconUrl } from '../shared/weather-icons.helper';
import { ZipCodeService } from '../shared/zip-code.service';
import {SkyCondition} from '../shared/weather.model'

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit {

  currentDayForecast: Forecast = {
  city: '',
  zipCode: '',
  weather: [{
    skyCondition: SkyCondition.UNKWON,
    tempMax: '',
    tempMin: '',
    temp: '',
    day: ''
  }]
};

@Input() zipCode: string = '';
@Output() zipCodeDeleted = new EventEmitter<string>();

constructor(private weatherService: WeatherService, private zipCodeService: ZipCodeService) { }

deleteZipCode(zipCode:string): void{
  this.zipCodeDeleted.emit(zipCode)
}
ngOnInit(){ this.getWeatherForecast(this.zipCode)}

getWeatherForecast(zipCode: string): void {
    this.weatherService.getCurrentDayForecast(zipCode)
      .subscribe(
        forecast => {
       
          this.currentDayForecast = forecast;
          console.log("recieved forcast: ",  this.currentDayForecast);
        },
        error => console.error('Error fetching current day forecast:', error)
      );
}

  getWeatherIconUrl(condition: string): string {
    return getWeatherIconUrl(condition);
  }



}


