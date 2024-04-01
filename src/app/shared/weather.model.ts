
export enum SkyCondition {
  SUNNY = 'sunny',
  SNOWY = 'snowy',
  CLOUDY = 'cloudy',
  RAINY = 'rainy',
  UNKWON = 'unkown'
}
export interface WeatherForecast {
  skyCondition: SkyCondition;
  tempMax: string;
  tempMin: string;
  temp: string;
  day: string;
}

export interface Forecast {
  city: string;
  zipCode: string;
  weather: WeatherForecast[];
}

