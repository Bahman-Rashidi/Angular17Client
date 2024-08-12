import { Component } from '@angular/core';

import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  products:IProduct[];  
  brands:IBrand[];  
  types:IType[];  

  constructor (private shopService:ShopService ){
    this.products=[];
    this.brands=[];
    this.types=[];


  }
  ngOnInit(){
    this.getProductsd();
    this.getBrands();
    this.getTypes();
  }
getProductsd(){
  this.shopService.getProduct().subscribe(response=>{

    this.products=response.data;
    console.log(response.data)
  },error=>{
    console.log(error)
  })
}
getBrands(){
  this.shopService.getBrands().subscribe(response=>{

    this.brands=response;
    //console.log(response.data)
  },error=>{
    console.log(error)
  })
}
getTypes(){
  this.shopService.getTypes().subscribe(response=>{

    this.types=response;
    //console.log(response.data)
  },error=>{
    console.log(error)
  })
}
}
