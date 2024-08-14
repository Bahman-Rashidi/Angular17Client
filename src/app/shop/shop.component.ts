import { Component } from '@angular/core';
import { ShopParams } from '../shared/models/ShopParams';
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

  products?: IProduct[];
  brands: IBrand[];
  types: IType[];
  totalCount:number;
  // bransIdSelected?: number;
  // typeIdSelected?: number;
  shopPrams=new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'},
  ]
  constructor(private shopService: ShopService) {
    this.products = [];
    this.brands = [];
    this.types = [];
    this.totalCount=0;

  }
  ngOnInit() {
    this.getProductsd();
    this.getBrands();
    this.getTypes();
  }
  getProductsd() {
    this.shopService.getProduct(this.shopPrams).subscribe(response => {

      this.products = response?.data;
      this.shopPrams.pageNumber=response!.pageIndex;
      this.shopPrams.pageSize=response!.pageSize;
      this.totalCount=response!.count;
    }, error => {
      console.log(error)
    })
  }
  getBrands() {
    this.shopService.getBrands().subscribe(response => {

     // this.brands = response;
      this.brands=[{id:0,name:'All'},...response]
      //console.log(response.data)
    }, error => {
      console.log(error)
    })
  }
  getTypes() {
    this.shopService.getTypes().subscribe(response => {

      this.types = [{id:0,name:'All'},...response];
      //console.log(response.data)
    }, error => {
      console.log(error)
    })
  }
  onBrandsSelected(bradnId: number) {
    this.shopPrams.brandId = bradnId;
    this.getProductsd();
  }
  ontypeSelected(typeId: number) {
    this.shopPrams.typeId = typeId;
    this.getProductsd();

  }
  onSortSelected(sort: string) {
    
  this.shopPrams.sort=sort;
  this.getProductsd();
  }
  onPageChanged(event: any) {
    this.shopPrams.pageNumber=event.page;
    this.getProductsd()
  }
}
