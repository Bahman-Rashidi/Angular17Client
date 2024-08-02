import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';

//where  this is provided  in 
@Injectable({
  providedIn: 'root' // means this is  actually provided  in app module 
})
export class ShopService {
  baseUrl='https://localhost:44303/api/'
  constructor(private http:HttpClient) { } 

  getWwather(){
    return this.http.get('http://localhost:54382/WeatherForecast')
  }
  getProduct(){



    //return this.http.get<IPagination>(this.baseUrl+'Products?pagesize=2')
//http://localhost:54382/WeatherForecast  http://localhost:44303/WeatherForecast

//https://localhost:44303/api/Products?pagesize=2  http://localhost:54382/api/Products?pagesize=2
//http://localhost:44303/api/Products?pagesize=2
//https://localhost:44303/api/Products?pagesize=2

    return this.http.get<IPagination>(this.baseUrl+'Products?pagesize=2')

    // return this.http.get<IPagination>(this.baseUrl+'product', {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // })
  }
}
