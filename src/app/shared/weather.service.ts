import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Forecast, WeatherForecast } from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '5a4b2d457ecbef9eb2a71e480b947604';

  constructor(private http: HttpClient) { }

  getCurrentDayForecast(zipCode: string): Observable<Forecast> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${this.apiKey}&units=imperial`;
    return this.http.get<any>(apiUrl).pipe(
        tap(response => console.log('API response: current weather service', response)), 
      map(response => this.mapToForecast(response))
    );
  }

  getFiveDayForecast(zipCode: string): Observable<Forecast[]> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${this.apiKey}&units=imperial`;
    return this.http.get<any>(apiUrl).pipe(
      tap(response => console.log('API response list 5days weather service', response)), 
      map(response => this.mapToForecasts(response))
    );
  }

  private mapToForecast(response: any): Forecast {
    const currentDate = new Date(Date.now() + response.timezone * 1000); // Adjust for time zone offset
    const currentDay = this.getDayOfWeek(currentDate.getDay());

    const currentWeatherForecast: WeatherForecast = {
      day: currentDay,
      skyCondition: response.weather[0].main,
      tempMax: response.main.temp_max,
      tempMin: response.main.temp_min,
      temp: response.main.temp
    };

    return {
      city: response.name,
      zipCode: '', // OpenWeatherMap API doesn't provide zip code directly in current weather endpoint
      weather: [currentWeatherForecast]
    };
  }

  private mapToForecasts(response: any): Forecast[] {
    const forecasts: Forecast[] = [];
    const uniqueDays: string[] = [];

    for (const forecast of response.list) {
      const dayOfWeek = this.getDayOfWeek(forecast.dt);
      
      // Check if the day already exists in uniqueDays array
      if (!uniqueDays.includes(dayOfWeek)) {
        uniqueDays.push(dayOfWeek);

        const weatherForecast: WeatherForecast = {
          day: dayOfWeek,
          skyCondition: forecast.weather[0].main,
          tempMax: forecast.main.temp_max,
          tempMin: forecast.main.temp_min,
          temp: forecast.main.temp
        };

        forecasts.push({
          city: response.city.name,
          zipCode: response.city.zipCode,
          weather: [weatherForecast]
        });
      }
    }
    return forecasts;
  }

  private getDayOfWeek(timestamp: number): string {
    const milliseconds = timestamp * 1000; // Convert seconds to milliseconds
    const date = new Date(milliseconds);

    // Adjust the timezone to UTC
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    // Get the day of the week
    const options = { weekday: 'long' as const }; // Specify 'long' as a const value
    const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(utcDate);

    return dayOfWeek;
  }
}
