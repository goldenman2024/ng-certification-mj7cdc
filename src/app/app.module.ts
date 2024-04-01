import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ZipCodesComponent } from './zipcodes-list/zipcodes-list.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import { WeatherFivedaysinfoComponent } from './weather-fivedaysinfo/weather-fivedaysinfo.component';
import { WeatherIconDirective } from './shared/weather-icon.src.directive';


const routes: Routes = [
  { path: '', component: ZipCodesComponent , data: { preload: true } },
   { path: 'forcast/:id', component: WeatherFivedaysinfoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ZipCodesComponent,
    WeatherInfoComponent,
    WeatherFivedaysinfoComponent,
    WeatherIconDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
