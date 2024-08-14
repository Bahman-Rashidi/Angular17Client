import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('search', { static: false })
  searchTerm!: ElementRef;
  
  products?: IProduct[];
  brands: IBrand[];
  types: IType[];
  totalCount:number;
  // bransIdSelected?: number;
  // typeIdSelected?: number;
  shopParams=new ShopParams();
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
    this.shopService.getProduct(this.shopParams).subscribe(response => {

      this.products = response?.data;
      this.shopParams.pageNumber=response!.pageIndex;
      this.shopParams.pageSize=response!.pageSize;
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
    this.shopParams.brandId = bradnId;
    this.getProductsd();
  }
  ontypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProductsd();

  }
  onSortSelected(sort: string) {
    
  this.shopParams.sort=sort;
  this.getProductsd();
  }
  onPageChanged(event: any) {
    this.shopParams.pageNumber=event.page;
    this.getProductsd()
  }
   onSearch() {
  
    this.shopParams.search = this.searchTerm.nativeElement.value;
  
 
    this.getProductsd();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
   
    this.getProductsd();
  }
}
