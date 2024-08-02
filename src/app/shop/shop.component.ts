import { Component } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  products:IProduct[];  
  constructor (private shopService:ShopService ){
    this.products=[];
  }
  ngOnInit(){

    this.shopService.getProduct().subscribe(response=>{

      this.products=response.data;
    },error=>{
      console.log(error)
    })
  }
}
