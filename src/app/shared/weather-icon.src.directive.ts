import { Directive, Input, HostBinding } from '@angular/core';
import { getWeatherIconUrl } from './weather-icons.helper';
import { SkyCondition } from './weather.model';
@Directive({ selector: '[weatherIcon]' })
export class WeatherIconDirective {
  @Input() skyCondition: string ='';

  @HostBinding('src') get iconUrl(): string {
      return getWeatherIconUrl(this.skyCondition);
  }
}
