import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { response } from 'express';
import { ShopParams } from '../shared/models/ShopParams';



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
  getProduct(shopPrams:ShopParams){

  let params=new HttpParams();
  if(shopPrams.brandId !==0){
    params=params.append('brandId',shopPrams.brandId.toString());
  }
  if(shopPrams.typeId !==0){
    params=params.append('typeId',shopPrams.typeId.toString());
  }

    params=params.append('sort',shopPrams.sort);
    params=params.append('pageIndex',shopPrams.pageNumber.toString());
    params=params.append('sort',shopPrams.pageSize.toString());
    if(shopPrams.search){
      params=params.append('search',shopPrams.search);
    }

    //return this.http.get<IPagination>(this.baseUrl+'Products?pagesize=2')
//http://localhost:54382/WeatherForecast  http://localhost:44303/WeatherForecast

//https://localhost:44303/api/Products?pagesize=2  http://localhost:54382/api/Products?pagesize=2
//http://localhost:44303/api/Products?pagesize=2
//https://localhost:44303/api/Products?pagesize=2

    return this.http.get<IPagination>(this.baseUrl+'Products',{observe:'response',params})
    .pipe  //  a  wrapper  around  any  RXJS  operator 
    (
      map (response=>{
        return response.body;
      })
    );

    // return this.http.get<IPagination>(this.baseUrl+'product', {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // })


  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'Products/brands')
  }
  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+'Products/types')
  }
}
