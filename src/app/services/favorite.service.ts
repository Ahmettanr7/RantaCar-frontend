import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from '../models/car';
import { FavoriteItem } from '../models/favoriteItem';
import { FavoriteItems } from '../models/favoriteItems';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService
    ) { }

  addToFavorite(car:Car){
    let item = FavoriteItems.find(c => c.car.id===car.id);
    if(item){
      this.toastrService.info(car.carName + " favorilerinizde zaten mevcut","Favorilerde ekli")
    }else{
    let favoriteItem = new FavoriteItem();
    favoriteItem.car = car;
    FavoriteItems.push(favoriteItem)
    this.localStorageService.set("carId", JSON.stringify(car.id));
    }
    
  }

  removeFromFavorite(car:Car){
    let item:FavoriteItem =  FavoriteItems.find(c=>c.car.id===car.id);
    FavoriteItems.splice(FavoriteItems.indexOf(item),1)
    this.localStorageService.remove("carId")
  }

  list():FavoriteItem[]{
    return FavoriteItems
  }
}
