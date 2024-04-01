import { Component, Input } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { Forecast } from '../shared/weather.model';
import { getWeatherIconUrl } from '../shared/weather-icons.helper';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-weather-fivedaysinfo',
  templateUrl: './weather-fivedaysinfo.component.html',
  styleUrls: ['./weather-fivedaysinfo.component.css']
})
export class WeatherFivedaysinfoComponent {

zipCode: string = '';
  fiveDayForecasts?: Forecast[];
  
displayedColumns: string[] = ['day', 'skyCondition', 'temp', 'tempMax', 'tempMin' , 'skyConditionIcon'];

  dataSource: Forecast[] = []; // Initialize dataSource as an empty array

 constructor(private route: ActivatedRoute, private weatherService: WeatherService) {
    this.zipCode = this.route.snapshot.paramMap.get('id') ?? ''; // Using nullish coalescing operator
 
  }


  ngOnInit(): void {
    this.getWeather5dForecast();
  }

  getWeather5dForecast(): void {
    this.weatherService.getFiveDayForecast(this.zipCode)
      .subscribe(
        forecasts => {
          this.fiveDayForecasts = forecasts;
          this.dataSource = forecasts; // Assign fiveDayForecasts to dataSource after it's populated
        },
        error => console.error('Error fetching five-day forecast:', error)
      );
  }

 getWeatherIconUrl(condition: string): string {
    return getWeatherIconUrl(condition);
  }


}
